FROM node:7.7.2-alpine
WORKDIR /usr/src/wemall/nodejs
COPY ./nodejs/package.json /usr/src/wemall/nodejs/package.json
COPY ./nodejs /usr/src/wemall/nodejs
COPY ./configuration.json /usr/src/wemall/configuration.json
COPY ./upload /usr/src/wemall/upload
RUN npm install --registry=https://registry.npm.taobao.org --quiet