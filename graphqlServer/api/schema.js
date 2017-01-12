"use strict";
var lodash_1 = require("lodash");
// import schemas
var mysqlSchema_1 = require("./schemas/mysqlSchema");
var githubSchema_1 = require("./schemas/githubSchema");
var baseSchema_1 = require("./schemas/baseSchema");
// helper tools to create graphql classes
var graphql_tools_1 = require("graphql-tools");
//************** Schema defintions *****************************************
var rootQuery = "\ntype RootQuery {\n  awt: [Awt]\n  allRepositories: [Repository]\n  repository(id: ID!): Repository\n  lastIssuesFromRepository(\n          id: ID!, count: Int, issueStates: [IssueState]!): [Issue]\n}\n";
var mutation = "\ntype Mutation {\n  addAwt(awt: AwtInput): Awt\n}\n";
var schemaDefintion = "\nschema {\n  query: RootQuery\n  mutation: Mutation\n}\n";
var typeDefs = [schemaDefintion, rootQuery, mutation,
    baseSchema_1.baseSchema, githubSchema_1.githubSchema, mysqlSchema_1.mysqlSchema];
//************** Resolver defintions *****************************************
var rootResolvers = {
    RootQuery: {
        awt: function (obj, args, context) {
            return context.models.awt.getAll(context);
        },
        allRepositories: function (obj, args, context) {
            return context.models.githubRepository.getAll(context);
        },
        repository: function (obj, args, context) {
            return context.models.githubRepository.getRepository(context, args);
        },
        lastIssuesFromRepository: function (obj, args, context) {
            return context.models.githubIssue.getLastIssuesFromRepository(context, args);
        }
    }
};
var rootMutations = {
    Mutation: {
        addAwt: function (obj, args, context) {
            return context.models.awt.add(args.awt, context);
        }
    }
};
var resolvers = lodash_1.merge(rootResolvers, rootMutations, mysqlSchema_1.resolvers, githubSchema_1.resolvers, baseSchema_1.resolvers);
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
//# sourceMappingURL=schema.js.map