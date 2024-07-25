# Dockerfile (client)
FROM node:20.15.1-alpine3.20

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
ENV WDS_SOCKET_PORT 0
CMD npm start