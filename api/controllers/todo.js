import todoServices from '../services/todo';
import statusCheckerHelper from '../helper/statusChecker';

const {
  statusChecker
} = statusCheckerHelper;

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = todoServices;

const todoController = {
  async createTodo(req, res) {
    try {
      const data = req.body;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await createTodo(data, req.authorizedData);

      const response = await statusChecker(
        req,
        res,
        statusCode,
        errorMessage,
        successMessage
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  async getTodos(req, res) {
    try {
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await getTodos(req.authorizedData);

      const response = await statusChecker(
        req,
        res,
        statusCode,
        errorMessage,
        successMessage
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  async getTodoById(req, res) {
    try {
      const { todoid } = req.params;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await getTodoById(todoid, req.authorizedData);

      const response = await statusChecker(
        req,
        res,
        statusCode,
        errorMessage,
        successMessage
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  async updateTodo(req, res) {
    try {
      const { todoid } = req.params;
      const data = req.body;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await updateTodo(data, todoid, req.authorizedData);

      const response = await statusChecker(
        req,
        res,
        statusCode,
        errorMessage,
        successMessage
      );
      return response;
    } catch (err) {
      return err;
    }
  },
  async deleteTodo(req, res) {
    try {
      const {
        todoid
      } = req.params;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await deleteTodo(todoid, req.authorizedData);

      const response = await statusChecker(
        req,
        res,
        statusCode,
        errorMessage,
        successMessage
      );
      return response;
    } catch (err) {
      return err;
    }
  }
};

export default todoController;
