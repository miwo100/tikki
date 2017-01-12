"use strict";
var githubSchema = "\nenum IssueState{\n    OPEN\n    CLOSED\n}\ntype Issue {\n    id: ID\n    author: String\n    body: String\n    createdAt: String\n    number: Int\n    state: IssueState\n    title: String\n}\n\ntype Repository {\n    id: ID\n    description: String\n    isPrivate: Boolean\n    issues(first: Int, after: String, last: Int, before: String,issueStates: [IssueState]!): [Issue]\n    name: String\n}\n";
exports.githubSchema = githubSchema;
exports.resolvers = {};
//# sourceMappingURL=githubSchema.js.map