import _ from "lodash"
import api from "./api"

function queryProduct(params = {}) {
  const { categoryId, page = 0, productCode, productId, productName, size = 20 } = params || {}
  const url = "/restaurant-cake-api/v1/user/products"
  return api.get(url, { categoryId, page, productCode, productId, productName, size })
}

function getProductById(productId) {
  const url = `/restaurant-cake-api/v1/user/products/${productId}`
  return api.get(url).then(({ data }) => data);
}

function getProductsByMultiId(productIdList) {
  return Promise.all(_.map(productIdList, id => getProductById(id)))
}

export default {
  queryProduct,
  getProductById,
  getProductsByMultiId,
}

