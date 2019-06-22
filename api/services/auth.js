import bcrypt from 'bcryptjs';
import short from 'short-uuid';
import { users } from '../db/models';
import registerValidator from '../validations/register';
import loginValidator from '../validations/login';

const authServices = {
  // REGISTER USER
  async register(data, token) {
    try {
      let statusCode = '', errorMessage = '', successMessage = '';
      const { errors, isValid } = registerValidator.registerValidator(data);

      // If error
      if (!isValid) {
        statusCode = 422;
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      // Remove white spaces from data
      const whiteSpaces = /\s/g;
      let {
        firstname, lastname, email, password
      } = data;
      firstname = firstname.replace(whiteSpaces, '');
      lastname = lastname.replace(whiteSpaces, '');
      email = email.replace(whiteSpaces, '');
      password = password.replace(whiteSpaces, '');

      // Check if email exist
      const emailExist = await users.findOne({
        where: {
          email
        }
      });

      if (emailExist) {
        statusCode = 409;
        errors.email = 'email already exist';
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      // IF NO ERROR

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      // generate userId;
      const userid = short.generate();

      const newUser = await users.create({
        userid,
        firstname,
        lastname,
        email,
        password
      });

      const user = {};
      user.user = {};
      user.user.userid = newUser.userid;
      user.user.firstname = newUser.firstname;
      user.user.lastname = newUser.lastname;
      user.user.email = newUser.email;
      user.user.createdAt = newUser.createdAt;
      user.user.token = token;

      statusCode = 201;
      successMessage = user;
      return {
        statusCode,
        errorMessage,
        successMessage
      };
    } catch (err) {
      return err;
    }
  },
  // LOGIN USER
  async login(data, token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';
      const {
        errors,
        isValid
      } = loginValidator.loginValidator(data);

      // If error
      if (!isValid) {
        statusCode = 422;
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      // Remove white spaces from data
      const whiteSpaces = /\s/g;
      let {
        email,
        password
      } = data;
      email = email.replace(whiteSpaces, '');
      password = password.replace(whiteSpaces, '');

      // Check if email exist
      const emailExist = await users.findOne({
        where: {
          email
        }
      });

      if (emailExist) {
        // Check if password exist
        // Load hash from your password DB.
        const unhashPassword = bcrypt
          .compareSync(password, emailExist.password);

        if (unhashPassword) {
          const user = {};
          user.user = {};
          user.user.userid = emailExist.userid;
          user.user.firstname = emailExist.firstname;
          user.user.lastname = emailExist.lastname;
          user.user.email = emailExist.email;
          user.user.createdAt = emailExist.createdAt;
          user.user.token = token;

          statusCode = 201;
          successMessage = user;
          return {
            statusCode,
            errorMessage,
            successMessage
          };
        }

        // RETURN ERROR IF INCORRECT PASSWORD
        statusCode = 400;
        errors.password = 'incorrect password';
        errorMessage = errors;
        return {
          statusCode,
          errorMessage,
          successMessage
        };
      }

      // RETURN ERROR IF NO EMAIL
      statusCode = 404;
      errors.email = 'email does not exist';
      errorMessage = errors;
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

export default authServices;
