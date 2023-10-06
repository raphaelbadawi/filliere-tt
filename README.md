Little website for a tennis table club.

# Prod

## Configuration

You need to fill the user and password values in the .env files in the backend folder. Fill them as it pleases you.

Regarding the tokens, you can generate a dummy Strapi application with `npx create-strapi-app@latest my-project` to reuse the token values it has generated in its .env file: you'll be sure they are intrinsincally valid.

It is possible to modify those values afterwards, but please note that if you change the token values, all existing API tokens will be invalidated and you will need to generate new ones using the Strapi admin UI.

## Run

### Dev

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

### Prod

First set a nginx reverse proxy to proxy HTTPS to HTTP 3000 and HTTPS 1337 to HTTP 1337.

Then you can run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

## Update packages

Updating packages is as simple as modifying the package.json files with the target versions, running `npm install` locally to update the package-lock.json packages, and then adding the --build flag at the end of the next run command to rebuild the Docker images.

# Dev

# Frontend

It's a NextJS front. Please refer to the [NextJS documentation](https://nextjs.org/docs).

Utility functions are in the utils folders, reusable components in the components folder, pages in the app folder and external services in the services folder.

Look at the [Strapi user documentation](https://docs.strapi.io/user-docs/intro) to make API calls to the backend. You can refer to the API schema definitions in JSON format /backend/src/api folder

# Backend

It's a Strapi backend. It has not been tweaked (yet) and is versioned mainly for the automigration of schemas.

If needed to customize the backend behavior, please refer to the [Strapi developer documentation](https://docs.strapi.io/dev-docs/intro).
