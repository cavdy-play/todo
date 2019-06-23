import short from 'short-uuid';
import { todos, users } from '../db/models';
import todoValidator from '../validations/todo';
import updateTodoValidator from '../validations/updateTodo';

const todoServices = {
  async createTodo(data, token) {
    try {
      let statusCode = '', errorMessage = '', successMessage = '';
      const { errors, isValid } = todoValidator.todoValidator(data);

      if (!isValid) {
        statusCode = 422;
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      // get userid
      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const { userid } = findUser;

      // Create Todo
      const {
        title,
        content,
        tags
      } = data;

      const todoid = short.generate();
      const createTodo = await todos.create({
        todoid,
        title,
        content,
        tags,
        userid
      });

      const todo = {};
      todo.todo = {};
      todo.todo.todoid = createTodo.todoid;
      todo.todo.title = createTodo.title;
      todo.todo.content = createTodo.content;
      todo.todo.tags = createTodo.tags.split(',');
      todo.todo.userid = createTodo.userid;

      statusCode = 201;
      successMessage = todo;

      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  },
  async getTodos(token) {
    try {
      let statusCode = '', errorMessage = '', successMessage = '';

      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const { userid } = findUser;

      const getTodos = await todos.findAll({
        where: {
          userid
        }
      });

      statusCode = 200;
      successMessage = getTodos;

      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  },
  async getTodoById(todoid, token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';

      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const {
        userid
      } = findUser;

      const getTodo = await todos.findOne({
        where: {
          userid,
          todoid
        }
      });

      statusCode = 200;
      successMessage = getTodo;

      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  },
  async updateTodo(data, todoid, token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';
      const {
        errors,
        isValid
      } = updateTodoValidator.updateTodoValidator(data);

      if (!isValid) {
        statusCode = 422;
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const {
        userid
      } = findUser;

      const getTodo = await todos.findOne({
        where: {
          userid,
          todoid,
        }
      });

      let {
        title,
        content,
        tags
      } = data;

      if (title === undefined) title = getTodo.title;
      if (content === undefined) content = getTodo.content;
      if (tags === undefined) tags = getTodo.tags;

      await todos.update({
        title,
        content,
        tags,
      }, {
        where: {
          userid,
          todoid,
        }
      });

      statusCode = 200;
      successMessage = 'updated successfully';

      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  },
  async deleteTodo(todoid, token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';

      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const {
        userid
      } = findUser;

      await todos.destroy({
        where: {
          todoid,
          userid
        }
      });

      statusCode = 200;
      successMessage = 'Todo Deleted';

      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  }
};

export default todoServices;
