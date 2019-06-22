import Validator from 'validator';
import isEmpty from '../helper/isEmpty';

const registerValidator = {
  registerValidator(data) {
    let {
      firstname, lastname, email, password
    } = data;
    const errors = {};
    const alphaRegex = /^([a-zA-Z]{2,12})$/;

    // check if empty with our function
    firstname = !isEmpty(firstname) ? firstname : '';
    lastname = !isEmpty(lastname) ? lastname : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    // Remove white spaces from data
    const whiteSpaces = /\s/g;
    firstname = firstname.replace(whiteSpaces, '');
    lastname = lastname.replace(whiteSpaces, '');
    email = email.replace(whiteSpaces, '');
    password = password.replace(whiteSpaces, '');

    // Validate first name field
    if (!Validator.isLength(firstname, { min: 2, max: 12 })) {
      errors.firstname = 'First name must be between 2 and 12 characters';
    }
    if (Validator.isEmpty(firstname) || !alphaRegex.test(firstname)) {
      errors.firstname = 'First name is required';
    }

    // Validate last name field
    if (!Validator.isLength(lastname, { min: 2, max: 12 })) {
      errors.lastname = 'Last name must be between 2 and 12 characters';
    }
    if (Validator.isEmpty(lastname) || !alphaRegex.test(lastname)) {
      errors.lastname = 'Last name is required';
    }

    // Validate email field
    if (!Validator.isEmail(email)) {
      errors.email = 'Invalid email address';
    }
    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }

    // Validate password field
    if (!Validator.isLength(password, { min: 8, max: 30 })) {
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

export default registerValidator;
