# DockerFile (server)
FROM node:20.15.1-alpine3.20

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
CMD npm run start:dev