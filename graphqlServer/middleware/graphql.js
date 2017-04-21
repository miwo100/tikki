"use strict";
// graphql express server
var graphql_server_express_1 = require("graphql-server-express");
// import connectors and models
var schema_1 = require("../api/schema");
var mysqlConnector_1 = require("../api/connectors/mysql/mysqlConnector");
var githubConnector_1 = require("../api/connectors/github/githubConnector");
var models_1 = require("../api/models");
var config = require("config");
var dbConfig = config.get("dbConfig");
var context = {
    models: models_1.models,
    connectors: {
        mysql: new mysqlConnector_1.MySqlConnector(dbConfig.server, dbConfig.database, dbConfig.username, dbConfig.password),
        github: new githubConnector_1.GithubConnector()
    }
};
// export graphql middleware
exports.graphqlMiddleware = graphql_server_express_1.graphqlExpress({ schema: schema_1.schema, context: context });
exports.graphiqlMiddleware = graphql_server_express_1.graphiqlExpress({ endpointURL: '/graphql' });
//# sourceMappingURL=graphql.js.map