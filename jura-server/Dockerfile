# DockerFile (server)
FROM node:20.19.0-alpine3.20

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
CMD npm run start:dev