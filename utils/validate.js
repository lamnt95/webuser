import _ from 'lodash';

const errors = {
  empty: {
    msg: 'Vui lòng điền đầy đủ thông tin này',
    isError: (value) => _.isEmpty(value),
  },
  emptyProduct: {
    msg: 'Sản phẩm không được bỏ trống.',
    isError: (value) => _.isEmpty(value),
  },
};

const errorsKeys = _.keys(errors);

// const responseError = [
//   {
//     errorField: 'propertyType',
//     errorMessage: 'Lỗi propertyType',
//   },
//   {
//     errorField: 'quickTitle',
//     errorMessage: 'Lỗi quickTitle',
//   },
// ];

export function validate(data = {}, configs, responseError = []) {
  const responseErrorKeyBy = _.keyBy(responseError, 'errorField') || {};
  const error = {};
  _.forEach(configs, (config) => {
    const { field } = config;
    const value = data[field];
    _.forEach(errorsKeys, (errorKey) => {
      if (config[errorKey] && errors[errorKey].isError(value)) {
        error[field] = {
          ...(error[field] || {}),
          [errorKey]: errors[errorKey].msg,
          fromApi: _.get(responseErrorKeyBy, [field, 'errorMessage']),
        };
      }
    });
  });
  return error;
}

export const orderConfig = [
  { field: 'receivedDate', empty: true },
  { field: 'addressDetail', empty: true },
  { field: 'addressType', empty: true },
  { field: 'provinceCode', empty: true },
  { field: 'districCode', empty: true },
  { field: 'email', empty: true },
  { field: 'fullName', empty: true },
  { field: 'phone', empty: true },
  { field: 'sex', empty: true },
  // { field: 'productDetails', emptyProduct: true },
];

export function validateOrder(data = {}, responseError = []) {
  return validate(data, orderConfig, responseError);
}

export default {
  validateOrder
}