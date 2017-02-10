"use strict";
var express = require("express");
var passport = require("passport");
var querystring = require("querystring");
exports.router = express.Router();
exports.router.route('/github/callback').
    get(function (req, res, next) {
    // passport.authenticate('github', {
    //     "successRedirect": "/secured",
    //     "failureRedirect": "/index"
    // }
    //redirect here
    passport.authenticate('github', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.writeHead(302, {
                "Location": "http://localhost:4200"
            });
        }
        if (err) {
            return next(err);
        }
        var parameters = querystring.stringify({
            access_token: user.dataValues.refresh_token || user.dataValues.access_token,
            profile_picture: user.dataValues.profile_picture,
            user_name: user.dataValues.username
        });
        res.writeHead(302, {
            'Location': 'http://localhost:4200/home?' + parameters
        });
        res.end();
    })(req, res, next);
});
exports.router.route('/github').
    get(function (req, res, next) {
    console.log("Hello from auth/github");
    passport.authenticate('github', { scope: [] })(req, res, next);
});
//# sourceMappingURL=auth.js.map