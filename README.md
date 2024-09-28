Little website for a table tennis club.

# Configuration

You need to fill the DB user and password values in the .env files in the backend folder. Fill them as it pleases you.

Regarding the app tokens, you can generate a dummy Strapi application with `npx create-strapi-app@latest dummy` and then reuse the token values of this dummy application: you'll be sure they are intrinsincally valid. Moreover, the ADMIN_JWT_TOKEN value of Strapi .env file must be replicated as the STRAPI_ADMIN_JWT of NextJS .env file.

It is possible to modify those values afterwards, but please note that if you change the token values, all existing API tokens will be invalidated and you will need to generate new ones using the Strapi admin UI.

Don't forget to fill your postmaster credentials for mailing to work (and to open the matching SMTP port in your firewall). You must also use your own Google ReCAPTCHA key to fill NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY in the NextJS .env file.

## Run

### Development

`docker compose -f docker-compose.yml -f docker-compose.dev.yml up`

If changes are made to the configuration (e.g. backoffice layout and labels, users roles), you must export the configuration again:
```bash
docker ps # spot your running strapi container name
docker exec -it <container_name> /bin/sh
cd /usr/src/app
npm run strapi export -- --exclude files,content --no-encrypt --no-compress  # don't --exclude files,content if you need to backup your data along with the configuration
mv -f export_* config.tar
exit
```

Finally, you will need to generate an API token in Strapi configuration and fill it in the .env.development.local file in the ./front folder. In a dev environment, you can use a full access token.

### Production

For the web server configuration, take example on the nginx.prod.conf example in the ./prod folder. It is recommended for things to work out of the box (including CI, nginx configuration and cleanup script) to clone the git repo in `/var` so it sits in `/var/filliere-tt`.

Make sure the NEXT_PUBLIC_HOST variable in your production NextJS .env matches your production host.

Then you can run `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

If this is the first deployment, restore the configuration:
```bash
docker ps # spot your running strapi container name
docker exec -it <container_name> /bin/sh
cd /usr/src/app
npm run strapi import -- -f ./config.tar  # WARNING: this will erase any previous configuration _and_ data
exit
```

Your frontend needs to be able to communicate with your backend. Now that your services are up, you will be able to generate an API token in Strapi configuration and fill it in the .env.production.local file in the ./front folder. Minimal permissions for the token are read cards, read contests, read posts, read tags, read title, read practical, read subscription, read and write comments. You may also need to set the default locale in Strapi configuration. It is recommended to create editors and authors rather than doing everything from the admin account.

Please note that most of the navigation will fail until all single entities have had their values filled on Strapi.

Finally, authorize the domain name to your Google ReCAPTCHA key.

## Backup

### Backup DB volume

`docker run --rm --mount source=filliere-tt_strapi-data-pg16,target=/var/lib/postgresql/data/ -v $(pwd):/backup postgres:16-alpine tar -czvf /backup/backup.tar.gz /var/lib/postgresql/data`

You may also backup the ./back/public/uploads folder.

### Restore DB volume

`docker run --rm --mount source=filliere-tt_strapi-data-pg16,target=/var/lib/postgresql/data/ -v $(pwd):/backup postgres:16-alpine sh -c "rm -rf /var/lib/postgresql/data/* && tar -xzvf /backup/backup.tar.gz -C /var/lib/postgresql/data/"`

#### Cleanup

You can add this :

`0 0 * * * /var/filliere-tt/prod/docker_cleanup.sh`

to /etc/crontab to remove all Docker leftover unused data (which can build up very quickly).

## Update

Updating packages is as simple as modifying the package.json files with the target versions and running `npm install` locally to update the package-lock.json files. It's more complicated to rehydrate this Docker-side since you have to remove the containers and the images (not the volumes) and then rebuild the images (see ./.github/workflows/deploy.yml).

### PostgreSQL

Stop running services: `docker compose stop`. Then run previous version of PostgreSQL: `docker run -d --name backup-db --platform linux/amd64 --env-file ./back/.env.development.local -v filliere-tt_strapi-data:/var/lib/postgresql/data postgres:12.0-alpine`. Dump the database: `docker exec -it backup-db /usr/local/bin/pg_dumpall -U postgres > dumpfile`. Remove the backup container: `docker stop backup-db && docker rm backup-db`. Remove all "CREATE ROLE "and "ALTER ROLE" lines from the dumpfile. PostgreSQL username and password should not contain any special character.

You can now run a restore container. First remove the target volume if it already exists: `docker volume rm filliere-tt_strapi-data-pg16` then you can `docker run -d --name restore-db --platform linux/amd64 --env-file ./back/.env.development.local -v filliere-tt_strapi-data-pg16:/var/lib/postgresql/data postgres:16-alpine`. And do the actual restore: `cat dumpfile | docker exec -i restore-db psql -U postgres -d filliere-tt-back`. Adapt the commands to use the POSTGRES_USER set in the .env file (and the production .env file if you're in production). Finally you can cleanup: `docker stop restore-db && docker rm restore-db` and restart the services.

### Update without downtime

Use docker swarm: `docker swarm init`. Follow the instructions returned by the swarm init command if you want to add other hosts to the swarm.

Then to run the service, instead of directly running docker compose, you can run : `docker stack deploy -c docker-compose.yml -c  docker-compose.prod.yml filliere-tt`. Then after each update you can just run the same command again to update the images and have all the handing over between outdated and updated containers as well as the following cleanup being handled automatically.

With swarm, you can add healtchecks on your compose files. For example, for Strapi, you could use:
```yml
    healthcheck:
      test: curl --fail http://0.0.0.0:1337 || exit 1
      interval: 60s
      retries: 5
      start_period: 20s
      timeout: 10s
```

You can also automate the deployment by setting up git jobs on events like push tags * to copy an updated code base to the host and to run shell commands as well.

# Development

## Frontend

It's a NextJS front. Please refer to the [NextJS documentation](https://nextjs.org/docs).

Utility functions are in the utils folders, reusable components in the components folder, pages in the app folder and external services in the services folder.

Look at the [Strapi user documentation](https://docs.strapi.io/user-docs/intro) to make API calls to the backend. You can refer to the API schema definitions in JSON format in the ./back/src/api folder

## Backend

It's a Strapi backend. It has not been tweaked (yet) and is versioned mainly for the automigration of schemas.

If needed to customize the backend behavior, please refer to the [Strapi developer documentation](https://docs.strapi.io/dev-docs/intro).
