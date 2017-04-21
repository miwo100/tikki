"use strict";
var GithubIssue = (function () {
    function GithubIssue() {
    }
    GithubIssue.prototype.getLastIssuesFromRepository = function (context, args) {
        if (args.id) {
            return context.connectors.github.getLastIssuesByRepositoryId(args.id, args.count, args.issueStates);
        }
    };
    return GithubIssue;
}());
exports.GithubIssue = GithubIssue;
//# sourceMappingURL=githubIssue.js.map