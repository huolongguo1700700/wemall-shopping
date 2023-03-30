FROM node:16.18.1
WORKDIR /usr/src/wemall/nodejs
COPY ./nodejs/package.json /usr/src/wemall/nodejs/package.json
COPY ./nodejs/node_modules /usr/src/wemall/nodejs/node_modules
COPY ./nodejs /usr/src/wemall/nodejs
COPY ./configuration.json /usr/src/wemall/configuration.json
COPY ./upload /usr/src/wemall/upload
RUN npm install --registry=https://registry.npm.taobao.org --quiet