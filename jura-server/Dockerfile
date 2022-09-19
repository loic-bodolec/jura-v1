# DockerFile (server)
FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
CMD npm run start:dev