/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import createServer from './server';

dotenv.config();

class App {
  private server: ApolloServer;

  public async run(): Promise<void> {
    await this.createServer();
    await this.startServer();
    await this.connectToTheDatabase();
  }

  private async createServer(): Promise<void> {
    this.server = await createServer();
  }

  private async startServer(): Promise<void> {
    const port = process.env.PORT || '3000';
    const { url } = await this.server.listen(port);
    console.log(`Server is running on the port ${port} at url ${url}`);
  }

  private async connectToTheDatabase(): Promise<void> {
    await createConnection();
    console.log('connected to database');
  }
}

export default App;
