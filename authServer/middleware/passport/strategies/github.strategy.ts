import * as passport from 'passport';
var GithubStrategy: any = require('passport-github').Strategy;
import { User } from "../../../database/models/user";
import { Database } from "../../../database";

export default (db: Database) => {

    passport.use(new GithubStrategy({
        clientID: '5c0f2c1456e305709287',
        clientSecret: '17f3115131a9f3feabfab79d72ef0cd3ba166ad9',
        callbackURL: 'http://localhost:3001/auth/github/callback',
        userAgent: 'tikki.de'
    },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {

                var attributes = {
                    access_token: accessToken,
                    refresh_token: refreshToken
                };

                return findOrCreateUser('github', profile.id, profile, attributes).then(function(user) {
                    return done(null, user);
                }).catch(function(error) {
                    console.log("Error in passport.js configuration file");
                    console.log(error);
                    return done(error);
                });

            });

        })

    );

    function findOrCreateUser(provider, social_id, profile, attributes) {
        return db.User.findOne({ where: { provider: provider, social_id: social_id } }).then(function(user) {
            if (user) {
                attributes = buildUpdatedAttributes(provider, social_id, profile, user, attributes);
                return user.update(attributes).then(function(updatedUser) {
                    return updatedUser;
                }).catch(function(error) {
                    throw error;
                });
            }
            else {
                attributes = buildCompleteAttributes(provider, social_id, profile, user, attributes);
                return db.User.create(attributes).then(function(newUser) {
                    return newUser;
                }).catch(function(error) {
                    throw error;
                });
            }
        })
    }

    function buildUpdatedAttributes(provider, social_id, profile, user, attributes) {
        var updatedUserAttributes = {};
        if (provider == 'github') {
            updatedUserAttributes = {
                profile_picture: profile.photos[0].value.split("?")[0],
                last_active: Date.now(),
                access_token: attributes.access_token,
                access_token_exp: user.access_token_exp,
                refresh_token: attributes.refresh_token
            };
        }

        return updatedUserAttributes;
    }

    function buildCompleteAttributes(provider, social_id, profile, user, attributes) {
        var completeUserAttributes;
        if (provider == 'github') {
            completeUserAttributes = {
                social_id: social_id,
                name: profile.displayName,
                username: profile.username,
                email: profile.emails[0].value,
                profile_picture: profile.photos[0].value.split("?")[0],
                provider: provider,
                last_active: Date.now(),
                access_token: attributes.access_token,
                refresh_token: attributes.refresh_token
            };
        }

        return completeUserAttributes;
    }
};