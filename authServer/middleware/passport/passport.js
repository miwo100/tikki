"use strict";
var passport = require("passport");
var github_strategy_1 = require("./strategies/github.strategy");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (app, db) {
    app.use(passport.initialize());
    //app.use(passport.session());
    // passport.serializeUser((user: any, done) => {
    //     done(null, user)
    // });
    // passport.deserializeUser((user: any, done) => {
    //     done(null, user);
    // });
    github_strategy_1.default(db);
};
//# sourceMappingURL=passport.js.map