const users = require('./database/users');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const authOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

module.exports = () => {
  const strategy = new JwtStrategy(authOptions, async (payload, next) => {
    const result = await users.readOne(payload.username);
    if (result.error) {
      next(new Error(result.error));
    } else {
      next(null, {
        id: result.id,
        username: result.username,
        name: result.name,
        image: result.image,
      });
    }
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
