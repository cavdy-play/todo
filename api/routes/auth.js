import express from 'express';
import authController from '../controllers/auth';
import jwtMiddleware from '../middlewares/jwt';

const {
  register,
  login
} = authController;

const {
  signinJwt
} = jwtMiddleware;

const router = express.Router();

router.post('/register', signinJwt, register);
router.post('/login', signinJwt, login);

export default router;
