import { ApolloServer } from 'apollo-server';
import Database from 'better-sqlite3';
import { Connection, createConnection } from 'typeorm';
import createServer from '../app/server';

let dbConnect!: Connection;
let testdb!: any;
let server: ApolloServer;

beforeAll(async () => {
  testdb = new Database('memory.db', { verbose: console.log });

  dbConnect = await createConnection({
    name: 'default',
    type: 'better-sqlite3',
    database: 'memory.db',
    entities: ['src/dataLayer/entities/**/*.ts'],
    synchronize: true,
  });

  server = await createServer();
});

beforeEach(async () => {
  const entities = dbConnect.entityMetadatas;

  entities.forEach(async (entity) => {
    const repo = dbConnect.getRepository(entity.name);
    await repo.clear();
  });
});

afterAll(async () => {
  dbConnect.close();
  testdb.close();
});
