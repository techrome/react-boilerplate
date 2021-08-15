import Validator from 'validatorjs';

import * as c from 'src/constants';
import { isdev } from 'src/config';

const validationsDisabled = false;

const createValidation =
  ({ title, rules, attributeNames } = {}) =>
  (payload) => {
    if (validationsDisabled) {
      return null;
    }

    const result = new Validator(payload, rules);

    if (attributeNames) {
      result.setAttributeNames(attributeNames);
    }

    if (result.passes()) {
      return null;
    } else {
      isdev && console.log(`Validations from ${title}`, result.errors.all());
      return result.errors.all();
    }
  };

export const validateSubscription = createValidation({
  title: 'subscription',
  rules: {
    [c.duration]: 'required',
    [c.amount]: 'required',
    [c.upfront]: 'required',
  },
  attributeNames: {
    [c.duration]: 'Duration',
    [c.amount]: 'Amount',
    [c.upfront]: 'Upfront payment',
  },
});
export const validateConfirmation = createValidation({
  title: 'confirmation',
  rules: {
    [c.email]: 'required|email',
    [c.terms]: 'required|accepted',
  },
  attributeNames: {
    [c.email]: 'Email',
    [c.terms]: 'Terms and conditions',
  },
});

// converter
export const convertValidations = (validations) => {
  try {
    let convertedValidations = {};
    for (const entry in validations) {
      // we get an array in each validation, but only need the
      // first element
      convertedValidations[entry] = validations[entry][0];
    }
    return convertedValidations;
  } catch (err) {
    isdev &&
      console.error('Error occured while converting validations! error:', err);
    return {};
  }
};
