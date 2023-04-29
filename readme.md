# Jura (tasks manager) => still in development

## About The Project

Realized in team and according to the SCRUM agile method, the JURA project aims to create a MVP (Minimum Viable Product) of project management application and associated tasks (tickets).

First, the necessary functionalities are formalized in a product backlog and a model is made with Figma.

After authentication, the user should be able to see his projects and the list of his tickets.

Depending on his authorization level, he can create or modify a project. All members can create a ticket, but tickets can be modified or deleted only by their creator or by the administrator. If necessary, tickets can be commented on.

Graphical data are also available for tracking created tickets.

Each user can access his profile and modify it. An account can be deleted by the user himself or by the administrator.

All CRUD operations are performed securely (authorization of requests with JWT). => still in progress

<p width="100%" align="center">
  <img width="49%" src="https://imgur.com/OJ5KPT4.png">
  <img width="49%" src="https://imgur.com/4Azwkjf.png">
</p>

## Technical stack

- Front-end : React / GraphQL / Apollo-Client / react-router / react-bootstrap
  
- Back-end : Node.js / GraphQL / Apollo-Server / TypeGraphQL / TypeORM / MySQL
  
(For all the project, TypeScript is used.)

- Data : SQL (MySQL)
  
- Containerization : Docker
  
- Testing : Jest / Playwright

## Global application architecture

![global architecture](https://imgur.com/ZEs02sA.png)

## Physical Data Model of the created database

=> The physical data model of the created database will be the following:

![physical data model](https://imgur.com/3iaLT6i.png)

## Install Server

=> see the [readme in the "jura-server"](https://github.com/loic-bodolec/jura-v1/blob/main/jura-server/readme.md) folder

## Install Client

=> see the [readme in the "jura-client"](https://github.com/loic-bodolec/jura-v1/blob/main/jura-client/readme.md) folder

## API GraphQL Schema ***(data types, queries, mutations...)***

You can access to the schema with [Apollo Studio](https://studio.apollographql.com/).

The GraphQL server uses a schema to describe the shape of your available data. This schema defines a hierarchy of types with fields that are populated from your back-end data stores. The schema also specifies exactly which queries and mutations are available for clients to execute.

## Illustrations

=> see the [screenshots](https://github.com/loic-bodolec/jura-v1/tree/main/screenshots-jura) folder
