import express from 'express';
import userController from '../controllers/user';
import jwtMiddleware from '../middlewares/jwt';

const {
  getUser,
  updateUser,
  deleteUser
} = userController;

const {
  verifyJwt
} = jwtMiddleware;

const router = express.Router();

router.get('/', verifyJwt, getUser);
router.patch('/', verifyJwt, updateUser);
router.delete('/', verifyJwt, deleteUser);

export default router;
