"use strict";
var GithubRepository = (function () {
    function GithubRepository() {
    }
    GithubRepository.prototype.getAll = function (context) {
        return context.connectors.github.getAllRepositories();
    };
    GithubRepository.prototype.getRepository = function (context, args) {
        if (args.id) {
            return context.connectors.github.getById(args.id);
        }
    };
    return GithubRepository;
}());
exports.GithubRepository = GithubRepository;
//# sourceMappingURL=githubRepository.js.map