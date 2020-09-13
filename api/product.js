import _ from "lodash"
import api from "./api"

function queryProductByCategoryId(categoryId) {
  const url = "/restaurant-cake-api/v1/user/products?page=0&size=1000"
  return api.get(url).then(({ data }) => data.content).then(res => categoryId ? _.filter(res, i => i.categoryId == categoryId) : res)
}

function searchProduct(keyword, categoryId) {
  return queryProductByCategoryId(categoryId).then(res => _.filter(res, i => _.includes(i.name, keyword)))
}

function getProductById(productId) {
  const url = `/restaurant-cake-api/v1/user/products/${productId}`
  return api.get(url).then(({ data }) => data);
}

function getProductsByMultiId(productIdList) {
  return Promise.all(_.map(productIdList, id => getProductById(id)))
}

export default {
  queryProductByCategoryId,
  getProductById,
  getProductsByMultiId,
  searchProduct
}

