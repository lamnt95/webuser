import api from "./api"

function createOrder(orderBody) {
  const url = "/restaurant-cake-api/v1/orders";
  return api.post(url, orderBody).then(({ data }) => data);
}

function validateOrder(orderBody) {
  const url = "/restaurant-cake-api/v1/orders/validator";
  return api.post(url, orderBody).then(({ data }) => data);
}

export default {
  createOrder,
  validateOrder
}