FROM node:20-alpine
RUN mkdir -p /usr/src/app
ENV PORT 1337
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
COPY ./patches/admin-api.js ./node_modules/@strapi/core/dist/services/server
COPY ./patches/index.js ./node_modules/@strapi/core/dist/configuration
COPY ./patches/urls.js ./node_modules/@strapi/core/dist/configuration

EXPOSE 1337

ENTRYPOINT ["/bin/sh", "-c"]