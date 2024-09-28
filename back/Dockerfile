FROM node:20-alpine
RUN mkdir -p /usr/src/app
ENV PORT 1337
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app

EXPOSE 1337

ENTRYPOINT ["/bin/sh", "-c"]