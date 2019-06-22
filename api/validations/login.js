import Validator from 'validator';
import isEmpty from '../helper/isEmpty';

const loginValidator = {
  loginValidator(data) {
    let {
      email,
      password
    } = data;
    const errors = {};

    // check if empty with our function
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    // Remove white spaces from data
    const whiteSpaces = /\s/g;
    email = email.replace(whiteSpaces, '');
    password = password.replace(whiteSpaces, '');

    // Validate email field
    if (!Validator.isEmail(email)) {
      errors.email = 'Invalid email address';
    }
    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }

    // Validate password field
    if (!Validator.isLength(password, {
      min: 8,
      max: 30
    })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }
    if (Validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};

export default loginValidator;
