import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusCheckerHelper from '../helper/statusChecker';

const {
  statusChecker
} = statusCheckerHelper;

dotenv.config();

const jwtMiddleware = {

  checkToken(req, res, next) {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      // If header is undefined return Forbidden (403)
      return statusChecker(req,
        res,
        403,
        'you are not logged in',
        '');
    }
  },

  async signinJwt(req, res, next) {
    const payload = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    };
    await jwt.sign(payload,
      process.env.JWTSECRETKEY,
      { expiresIn: '24h' },
      async (err, token) => {
        if (err) {
          return statusChecker(req,
            res,
            403,
            'failed',
            '');
        }
        req.signintoken = token;
        return next();
      });
  },

  verifyJwt(req, res, next) {
    jwt.verify(req.token, process.env.JWTSECRETKEY, (err, authorizedData) => {
      if (err) {
        return statusChecker(req,
          res,
          403,
          'invalid token',
          '');
      }
      req.authorizedData = authorizedData;
      return next();
    });
  },
};

export default jwtMiddleware;
