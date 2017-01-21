import * as express from 'express';
import * as bodyParser from 'body-parser';

// graphql express server
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
// import connectors and models
import { schema } from './api/schema';
import { MySqlConnector } from './api/connectors/mysql/mysqlConnector';
import { GithubConnector } from "./api/connectors/github/githubConnector";
import { models } from './api/models';

const context = {
  models: models,
  connectors: {
    mysql: new MySqlConnector("ENV['DATABASE_URL']", "ENV['DATABASE_NAME']", "ENV['DATABASE_USER']", "ENV['DATABASE_PASS']"),
    github: new GithubConnector()
  }
};

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema, context: context }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const DEFAULT_PORT = 3000;
var port = normalizePort(process.env.PORT || DEFAULT_PORT);
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, function () {
  console.log('Example app listening on port', port);
});

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

