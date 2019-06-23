import express from 'express';
import todoController from '../controllers/todo';
import jwtMiddleware from '../middlewares/jwt';

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = todoController;

const {
  verifyJwt
} = jwtMiddleware;

const router = express.Router();

router.post('/', verifyJwt, createTodo);
router.get('/', verifyJwt, getTodos);
router.get('/:todoid', verifyJwt, getTodoById);
router.patch('/:todoid', verifyJwt, updateTodo);
router.delete('/:todoid', verifyJwt, deleteTodo);

export default router;
