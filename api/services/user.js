import bcrypt from 'bcryptjs';
import { users } from '../db/models';
import userValidator from '../validations/updateUser';

const userServices = {
  // GET USER
  async getUser(token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';

      const findUser = await users.findOne({
        where: {
          email: token.email
        }
      });

      const user = {};
      user.user = {};
      user.user.userid = findUser.userid;
      user.user.firstname = findUser.firstname;
      user.user.lastname = findUser.lastname;
      user.user.email = findUser.email;
      user.user.createdAt = findUser.createdAt;
      user.user.token = token;

      statusCode = 200;
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
  // UPDATE USER
  async updateUser(data, token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';
      const {
        errors,
        isValid
      } = userValidator.updateUserValidator(data);

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

      let {
        firstname,
        lastname,
        email,
        password
      } = data;

      // Remove white spaces from data
      const whiteSpaces = /\s/g;
      if (firstname !== undefined) firstname = firstname.replace(whiteSpaces, '');
      if (lastname !== undefined) lastname = lastname.replace(whiteSpaces, '');
      if (email !== undefined) email = email.replace(whiteSpaces, '');
      if (password !== undefined) password = password.replace(whiteSpaces, '');

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      if (password !== undefined) password = bcrypt.hashSync(password, salt);

      if (firstname === undefined) firstname = findUser.firstname;
      if (lastname === undefined) lastname = findUser.lastname;
      if (email === undefined) email = findUser.email;
      if (password === undefined) password = findUser.password;

      await users.update({
        firstname,
        lastname,
        email,
        password
      }, {
        where: {
          email: token.email
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
      console.log(err)
      return err;
    }
  },
  async deleteUser(token) {
    try {
      let statusCode = '',
        errorMessage = '',
        successMessage = '';

      await users.destroy({
        where: {
          email: token.email
        }
      });

      statusCode = 200;
      successMessage = 'User Deleted';

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

export default userServices;
