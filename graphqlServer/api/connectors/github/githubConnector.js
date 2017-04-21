"use strict";
var config = require("config");
var ACCESS_TOKEN = config.get('GITHUB_ACCESS_TOKEN');
var apollo_client_1 = require("apollo-client");
var graphql_tag_1 = require("graphql-tag");
// fetch is needed in the global node namespace to be able to execute graphql queries
var fetch = require('node-fetch');
global.fetch = fetch;
var IssueState;
(function (IssueState) {
    IssueState[IssueState["OPEN"] = 0] = "OPEN";
    IssueState[IssueState["CLOSED"] = 1] = "CLOSED";
})(IssueState = exports.IssueState || (exports.IssueState = {}));
var GithubConnector = (function () {
    function GithubConnector() {
        this.allRepositoriesQuery = (_a = ["\n      query repositories($fieldEnum: RepositoryOrderField!, $directionEnum: OrderDirection!) {\n        repositoryOwner(login: \"miwo100\") {\n          repositories(first: 30, orderBy: {field: $fieldEnum, direction: $directionEnum}) {\n            edges {\n              node {\n                ...allRepositoriesQueryRepositoryFragment\n              }\n            }\n          }\n        }\n      }\n      \n      fragment allRepositoriesQueryRepositoryFragment on Repository {\n        id\n        description\n        isPrivate\n        name\n      }\n    "], _a.raw = ["\n      query repositories($fieldEnum: RepositoryOrderField!, $directionEnum: OrderDirection!) {\n        repositoryOwner(login: \"miwo100\") {\n          repositories(first: 30, orderBy: {field: $fieldEnum, direction: $directionEnum}) {\n            edges {\n              node {\n                ...allRepositoriesQueryRepositoryFragment\n              }\n            }\n          }\n        }\n      }\n      \n      fragment allRepositoriesQueryRepositoryFragment on Repository {\n        id\n        description\n        isPrivate\n        name\n      }\n    "], graphql_tag_1.default(_a));
        this.repositoryByIdQuery = (_b = ["\n      query repositoryById($id: ID!){\n        node(id: $id){\n           ...repositoryFragment\n        }\n      }\n      \n      fragment repositoryFragment on Repository {\n        id\n        description\n        isPrivate\n        name\n      }\n    "], _b.raw = ["\n      query repositoryById($id: ID!){\n        node(id: $id){\n           ...repositoryFragment\n        }\n      }\n      \n      fragment repositoryFragment on Repository {\n        id\n        description\n        isPrivate\n        name\n      }\n    "], graphql_tag_1.default(_b));
        this.lastIssuesByRepositoryIdQuery = (_c = ["\n      query issuesByRepositoryIdForward($id: ID!, \n        $last: Int,\n        $issueStates: [IssueState!]) \n      {\n        node(id: $id) {\n          ...issuesFragment\n        }\n      } \n\n      fragment issuesFragment on Repository {\n        issues(last: $last, states: $issueStates){\n          edges{\n            node{\n      \t\t\t\t...issueFragment\n            }\n          }\n        }\n      }          \n      \n      fragment issueFragment on Issue {\n              id\n              body\n      \t\t\t\tstate\n              createdAt\n              title\n              number\n      }\n    "], _c.raw = ["\n      query issuesByRepositoryIdForward($id: ID!, \n        $last: Int,\n        $issueStates: [IssueState!]) \n      {\n        node(id: $id) {\n          ...issuesFragment\n        }\n      } \n\n      fragment issuesFragment on Repository {\n        issues(last: $last, states: $issueStates){\n          edges{\n            node{\n      \t\t\t\t...issueFragment\n            }\n          }\n        }\n      }          \n      \n      fragment issueFragment on Issue {\n              id\n              body\n      \t\t\t\tstate\n              createdAt\n              title\n              number\n      }\n    "], graphql_tag_1.default(_c));
        this.issuesByRepositoryIdBackwardQuery = (_d = ["\n      query issuesByRepositoryIdBackward($id: ID!, \n        $last: Int,\n        $issueStates: [IssueState!]) \n      {\n        node(id: $id) {\n          ...issuesBackwardFragment\n        }\n      }\n\n      fragment issuesBackwardFragment on Repository {\n        issues(last: $last, states: $issueStates){\n          edges{\n            node{\n      \t\t\t\t...issueFragment\n            }\n          }\n        }\n      } \n    "], _d.raw = ["\n      query issuesByRepositoryIdBackward($id: ID!, \n        $last: Int,\n        $issueStates: [IssueState!]) \n      {\n        node(id: $id) {\n          ...issuesBackwardFragment\n        }\n      }\n\n      fragment issuesBackwardFragment on Repository {\n        issues(last: $last, states: $issueStates){\n          edges{\n            node{\n      \t\t\t\t...issueFragment\n            }\n          }\n        }\n      } \n    "], graphql_tag_1.default(_d));
        var githubNetworkInterface = apollo_client_1.createNetworkInterface({ uri: "https://api.github.com/graphql" });
        var middleWare = {
            applyMiddleware: function (req, next) {
                if (!req.options.headers) {
                    req.options.headers = {};
                }
                req.options.headers.authorization = ACCESS_TOKEN;
                next();
            }
        };
        githubNetworkInterface.use([middleWare]);
        this.githubClient = new apollo_client_1.default({
            networkInterface: githubNetworkInterface
        });
        var _a, _b, _c, _d;
    }
    GithubConnector.prototype.getAllRepositories = function () {
        var _this = this;
        var fieldEnum;
        (function (fieldEnum) {
            fieldEnum[fieldEnum["NAME"] = 0] = "NAME";
        })(fieldEnum || (fieldEnum = {}));
        var orderDirection;
        (function (orderDirection) {
            orderDirection[orderDirection["ASC"] = 0] = "ASC";
            orderDirection[orderDirection["DESC"] = 1] = "DESC";
        })(orderDirection || (orderDirection = {}));
        return new Promise(function (resolve, reject) {
            _this.githubClient.query({
                query: _this.allRepositoriesQuery,
                variables: {
                    fieldEnum: "NAME",
                    directionEnum: "ASC"
                }
            }).then(function (_a) {
                var loading = _a.loading, data = _a.data;
                if (!loading) {
                    var repos = data.repositoryOwner.repositories.edges.map(function (val) { return val.node; });
                    console.log(data.repositoryOwner.repositories.edges.map(function (val) { return val.node.name; }));
                    resolve(repos);
                }
            }, function (reason) {
                console.log("hello from rejected" + reason);
                reject(reason);
            });
        });
    };
    GithubConnector.prototype.getById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.githubClient.query({
                query: _this.repositoryByIdQuery,
                variables: {
                    id: id
                }
            }).then(function (_a) {
                var loading = _a.loading, data = _a.data;
                if (!loading) {
                    //let repos: any = data.repositoryOwner.repositories.edges.map((val) => val.node);
                    console.log(data);
                    resolve(data.node);
                }
            }, function (reason) {
                console.log("hello from rejected" + reason);
                reject(reason);
            });
        });
    };
    GithubConnector.prototype.getLastIssuesByRepositoryId = function (repositoryId, count, states) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.githubClient.query({
                query: _this.lastIssuesByRepositoryIdQuery,
                variables: {
                    id: repositoryId,
                    last: count,
                    issueStates: states //states.map(val => IssueState[val])
                }
            }).then(function (_a) {
                var loading = _a.loading, data = _a.data;
                if (!loading) {
                    var issues = data.node.issues.edges.map(function (val) { return val.node; });
                    resolve(issues);
                }
            }, function (reason) {
                console.log("hello from rejected" + reason);
                reject(reason);
            });
        });
    };
    return GithubConnector;
}());
exports.GithubConnector = GithubConnector;
//# sourceMappingURL=githubConnector.js.map