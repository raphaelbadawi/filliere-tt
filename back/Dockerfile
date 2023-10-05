FROM node:18-alpine
RUN mkdir -p /usr/src/app
ENV PORT 1337
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app

RUN npm run build
EXPOSE 1337

ENTRYPOINT ["npm", "run"]