// graphql express server
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
// import connectors and models
import { schema } from '../api/schema';
import { MySqlConnector } from '../api/connectors/mysql/mysqlConnector';
import { GithubConnector } from "../api/connectors/github/githubConnector";
import { models } from '../api/models';
import * as config from 'config';

let dbConfig: any = config.get<any>("dbConfig");

const context = {
  models: models,
  connectors: {
    mysql: new MySqlConnector(dbConfig.server,dbConfig.database,dbConfig.username,dbConfig.password),
    github: new GithubConnector()
  }
};

// export graphql middleware
export var graphqlMiddleware = graphqlExpress({ schema: schema, context: context });
export var graphiqlMiddleware = graphiqlExpress({ endpointURL: '/graphql' });
