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
  let authMiddleware = passport.authenticate('jwt', { session: false })

  app.post('/register', async (req, res) => {
    const potentialUser = users.preparePotentialUser(req.body);
    const result = await users.create(potentialUser);

    if (result.code) {
      res.statusCode = result.code;
      res.json(result.error);
    } else {
      const user = await users.readOne(result);
      res.json({
        id: result.id,
        username: result.username,
        name: result.name,
        image: result.image,
      });
    }
  });

  app.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Bad Request');
    }

    const result = await users.readOne(req.body.username);
    if (result.error) {
      return req.status(user.error.code).json(result);
    }

    const user = result;

    let authenticated = await users.authenticate(user, req.body.password);
    if (authenticated) {
      const payload = {
        id: user.id,
        username: user.username,
        name: user.name,
      };

      const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
      res.send(token);
    } else {
      res.status(401).json({
          error: 'Invalid Credentials',
          code: 401,
      });
    }
  });

  app.get('/protected', authMiddleware, (req, res) => {
    res.json({
        YEY: 'Authenticated',
    });
  });
}
