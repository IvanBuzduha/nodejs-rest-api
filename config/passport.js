require('dotenv').config();
const Users = require('../service/users');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
// const passportJWT = require('passport-jwt');
// const ExtractJwt = passportJWT.ExtractJwt;
// const Strategy  = passportJWT.Strategy;
// const SECRET = process.env.SECRET;

const opts = {
  // secretOrKey: SECRET,
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {

    try {
      const user = await Users.findById(payload.id);

      if (!user) {

        return done(new Error('Not authorized'));
      }

      if (!user.token) {

        return done(null,false);
      }

        return done(null,user);
      } catch (err) {
        return done(err,false);
      }
    })
);