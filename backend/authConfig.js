const users = require('./database/users');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


const authOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(authOptions, async (payload, next) => {
  // TODO: Get user from DB
  const user = await users.readOne(payload.id);
  next(null, {
    username: user.username,
    name: user.name,
    image: user.image,
  });
});

passport.use(strategy);

exports.configureAuthFor = (app) => {
  app.use(passport.initialize());

  app.post('/signup', async (req, res) => {
    const potentialUser = users.preparePotentialUser(req.body);
    const result = await users.create(potentialUser);

    if (result.code) {
      res.statusCode = result.code;
      res.json(result.error);
    } else {
      res.json({
        username: result.username,
        name: result.name,
        image: result.image,
      });
    }
  });
}
