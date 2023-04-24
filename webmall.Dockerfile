FROM node:16-alpine 

WORKDIR /usr/src/wemall/webmall
COPY ./webmall /usr/src/wemall/webmall
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install pm2 -g
RUN npm ci 
# Build the app
RUN npm run build
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000