# Dockerfile (client)
FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
ENV WDS_SOCKET_PORT 0
CMD npm start