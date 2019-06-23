import Validator from 'validator';
import isEmpty from '../helper/isEmpty';

const updateTodoValidator = {
  updateTodoValidator(data) {
    const {
      title,
      content,
      tags
    } = data;
    const errors = {};
    const arrayRegex = /^([a-zA-Z, ]{2,})$/;

    // Validate title
    if (!isEmpty(title)) {
      if (!Validator.isLength(title, {
        min: 2
      })) {
        errors.title = 'Title should be above 2 letter';
      }
      if (Validator.isEmpty(title)) {
        errors.title = 'Title can not be empty';
      }
    }

    // Validate content
    if (!isEmpty(content)) {
      if (!Validator.isLength(content, {
        min: 2
      })) {
        errors.content = 'Content must be above 2 characters';
      }
      if (Validator.isEmpty(content)) {
        errors.content = 'Content is required';
      }
    }

    // Validate tags
    if (!isEmpty(tags)) {
      if (!arrayRegex.test(tags)) {
        errors
          .tags = 'tags can only have alphabet';
      }
      if (!Validator.isLength(tags, {
        min: 2
      })) {
        errors.tags = 'Tags is required';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};

export default updateTodoValidator;
