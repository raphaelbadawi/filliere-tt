FROM node:20-alpine
RUN mkdir -p /usr/src/app
ENV PORT 3000
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install --force
COPY . /usr/src/app

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"
ENTRYPOINT ["/bin/sh", "-c"]