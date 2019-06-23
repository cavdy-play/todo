import Validator from 'validator';
import isEmpty from '../helper/isEmpty';

const updateUserValidator = {
  updateUserValidator(data) {
    let {
      firstname,
      lastname,
      email,
      password
    } = data;
    const errors = {};
    const alphaRegex = /^([a-zA-Z]{2,12})$/;

    // Remove white spaces from data
    const whiteSpaces = /\s/g;
    if (firstname !== undefined) firstname = firstname.replace(whiteSpaces, '');
    if (lastname !== undefined) lastname = lastname.replace(whiteSpaces, '');
    if (email !== undefined) email = email.replace(whiteSpaces, '');
    if (password !== undefined) password = password.replace(whiteSpaces, '');

    // Validate first name field
    if (!isEmpty(firstname)) {
      if (!Validator.isLength(firstname, {
        min: 2,
        max: 12
      })) {
        errors.firstname = 'First name must be between 2 and 12 characters';
      }
      if (Validator.isEmpty(firstname) || !alphaRegex.test(firstname)) {
        errors.firstname = 'First name is required';
      }
    }

    // Validate last name field
    if (!isEmpty(lastname)) {
      if (!Validator.isLength(lastname, {
        min: 2,
        max: 12
      })) {
        errors.lastname = 'Last name must be between 2 and 12 characters';
      }
      if (Validator.isEmpty(lastname) || !alphaRegex.test(lastname)) {
        errors.lastname = 'Last name is required';
      }
    }

    // Validate email field
    if (!isEmpty(email)) {
      if (!Validator.isEmail(email)) {
        errors.email = 'Invalid email address';
      }
      if (Validator.isEmpty(email)) {
        errors.email = 'Email is required';
      }
    }

    // Validate password field
    if (!isEmpty(password)) {
      if (!Validator.isLength(password, {
        min: 8,
        max: 30
      })) {
        errors.password = 'Password must be between 8 and 30 characters';
      }
      if (Validator.isEmpty(password)) {
        errors.password = 'Password is required';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};

export default updateUserValidator;
