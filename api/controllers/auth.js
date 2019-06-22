import authServices from '../services/auth';
import statusCheckerHelper from '../helper/statusChecker';

const {
  statusChecker
} = statusCheckerHelper;

const {
  register,
  login
} = authServices;

const authController = {
  // REGISTER CONTROLLER
  async register(req, res) {
    try {
      const data = req.body;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await register(data, req.signintoken);

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
  // LOGIN CONTROLLER
  async login(req, res) {
    try {
      const data = req.body;
      const {
        statusCode,
        errorMessage,
        successMessage
      } = await login(data, req.signintoken);

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

export default authController;
