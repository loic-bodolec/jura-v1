/* eslint-disable max-len */
import { ApolloServer } from 'apollo-server';
import depthLimit from 'graphql-depth-limit';
import { buildSchema } from 'type-graphql';
import corsOptions from '../config/cors';
import { customAuthChecker } from '../core/auth/middleware/customAuthChecker';
import { getTokenFromAuthorization } from '../core/auth/utils/getTokenFromAuthorization';
import { IContext } from '../core/interfaces/context/IContext';
import { AuthResolver } from '../resolvers/auth/AuthResolver';
import { CommentResolver } from '../resolvers/comment/CommentResolver';
import { ProjectResolver } from '../resolvers/project/ProjectResolver';
import { TicketResolver } from '../resolvers/ticket/TicketResolver';
import { UserResolver } from '../resolvers/user/UserResolver';

// TODO security check : size, depth, amount/rate limiting, operation whitelisting, no introspection in production...
// TODO install graphql-validation-complexity?

async function createServer(): Promise<ApolloServer> {
  // Create Executable Schema
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver, TicketResolver, CommentResolver, AuthResolver],
    globalMiddlewares: [],
    // Indicates if class-validator should be used to auto validate objects injected into params. You can directly pass validator options
    // to enable validator with a given options. Also, you can provide your own validation function to check the args.
    validate: true,
    authChecker: customAuthChecker,
    // If we need silent auth guards and don't want to return authorization errors to users :
    // authMode: 'null',
    // automatically create `schema.gql` file with schema definition in project's working directory
    emitSchemaFile: {
      commentDescriptions: true,
    },
  });

  // Create a GraphQL server
  const server = new ApolloServer({
    // To protect your server from CSRF (feature enabled by default in Apollo Server 4)
    csrfPrevention: true,
    // Currently : development cors configuration
    cors: corsOptions,
    // Defense against unbounded GraphQL queries (limit the complexity of the queries solely by their depth)
    validationRules: [depthLimit(10)],
    // Turning off introspection in production
    introspection: process.env.NODE_ENV !== 'production',
    // How long to wait before forcefully closing non-idle connections. Defaults to 10_000 (10 secs) / here : 1h.
    stopGracePeriodMillis: 1 * 60 * 60 * 1000,
    // Mask errors to prevent information leakage
    formatError: (err) => {
      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err;
    },
    schema,
    context: ({ req }): IContext => ({
      token: getTokenFromAuthorization(req?.headers.authorization),
      user: null,
    }),
  });
  return server;
}

export default createServer;
