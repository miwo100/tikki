import * as passport from 'passport';
import { default as githubStrategy } from './strategies/github.strategy';
import { Database } from "../../database";

export default (app: any, db: Database) => {

    app.use(passport.initialize());
    //app.use(passport.session());

    // passport.serializeUser((user: any, done) => {
    //     done(null, user)
    // });

    // passport.deserializeUser((user: any, done) => {
    //     done(null, user);
    // });

    githubStrategy(db);
}

