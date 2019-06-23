import userServices from '../services/user';
import statusCheckerHelper from '../helper/statusChecker';

const {
  statusChecker
} = statusCheckerHelper;

const {
  getUser,
  updateUser,
  deleteUser
} = userServices;

const userController = {
  async getUser(req, res) {
    try {
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await getUser(req.authorizedData);

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
  async updateUser(req, res) {
    try {
      const data = req.body;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await updateUser(data, req.authorizedData);

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
  async deleteUser(req, res) {
    try {
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await deleteUser(req.authorizedData);

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

export default userController;
