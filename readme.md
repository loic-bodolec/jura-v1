# Jura (tasks manager) => still in development

## Summary

After authentication, the user should be able to see his projects and the list of his tickets.
Depending on his authorization level, he can create or modify a project. All members can create a ticket, but tickets can be modified or deleted only by their creator or by the administrator. If necessary, tickets can be commented on.

Graphical data are also available for tracking created tickets.

Each user can access his profile and modify it. An account can be deleted by the user himself or by the administrator.
All CRUD operations are performed securely (authorization of requests with JWT).

## Technical stack

- Front-end : React / GraphQL / Apollo-Client / react-router / react-bootstrap
  
- Back-end : Node.js / GraphQL / Apollo-Server / TypeGraphQL / TypeORM / MySQL
  
(For all the project, TypeScript is used.)

- Data : SQL
  
- Containerization : Docker
  
- Testing : Jest / Playwright

## Global schema

![global schema](https://imgur.com/ZEs02sA.png)

## Physical Data Model of the created database

=> The physical data model of the created database will be the following:

![physical data model](https://imgur.com/3iaLT6i.png)

### Install Server

=> see the readme in the "jura-server" folder

### Install Client

=> see the readme in the "jura-client" folder
