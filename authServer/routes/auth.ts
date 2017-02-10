import * as express from 'express';
import * as passport from 'passport';
import * as querystring from 'querystring';

export var router = express.Router();

router.route('/github/callback').
    get((req, res, next) => {
        // passport.authenticate('github', {
        //     "successRedirect": "/secured",
        //     "failureRedirect": "/index"
        // }
        //redirect here
        passport.authenticate('github', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                return res.writeHead(302, {
                    "Location": "http://localhost:4200"
                });
            }
            if (err) { return next(err); }
            var parameters: string = querystring.stringify({
                access_token: user.dataValues.refresh_token || user.dataValues.access_token,
                profile_picture: user.dataValues.profile_picture,
                user_name: user.dataValues.username
            });
            res.writeHead(302, {
                'Location': 'http://localhost:4200/home?' + parameters
            });
            res.end();

        }
        )(req, res, next);
    }
    );

router.route('/github').
    get(
    (req, res, next) => {
        console.log("Hello from auth/github");
        passport.authenticate('github', { scope: [] })(req, res, next);
    });
