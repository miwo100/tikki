"use strict";
var express = require("express");
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var bodyParser = require("body-parser");
// graphql express server
var graphql_server_express_1 = require("graphql-server-express");
// import connectors and models
var schema_1 = require("./api/schema");
var mysqlConnector_1 = require("./api/connectors/mysql/mysqlConnector");
var githubConnector_1 = require("./api/connectors/github/githubConnector");
var models_1 = require("./api/models");
var context = {
    models: models_1.models,
    connectors: {
        mysql: new mysqlConnector_1.MySqlConnector("localhost", "tikki", "root", "cognovo"),
        github: new githubConnector_1.GithubConnector()
    }
};

const GITHUB_CLIENT_ID = "5c0f2c1456e305709287";
const GITHUB_CLIENT_SECRET = "17f3115131a9f3feabfab79d72ef0cd3ba166ad9";
const DEFAULT_PORT = 3000;

//express graphql server
var app = express();
app.use('/graphql', bodyParser.json(), graphql_server_express_1.graphqlExpress({ schema: schema_1.schema, context: context }));
app.use('/graphiql', graphql_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));

//express auth middleware
passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:" + DEFAULT_PORT + "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ githubId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));


var port = normalizePort(process.env.PORT || DEFAULT_PORT);
app.set('port', port);

//global error handler
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, function() {
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
//# sourceMappingURL=index.js.map