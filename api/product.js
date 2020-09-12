import _ from "lodash"
import api from "./api"

function queryProductByCategoryId(params = {}) {
  const { page = 0, size = 1000, checkedStatus = "APPROVE", categoryId } = params;
  const url = `/restaurant-cake-api/v1/admin/products?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data.content).then(res => categoryId ? _.filter(res, i => i.categoryId == categoryId) : res)
}

function getProductById(productId) {
  const url = `/restaurant-cake-api/v1/user/products/${productId}`
  return api.get(url).then(({ data }) => data);
}

function getProductsByMultiId(productIdList){
  return Promise.all(_.map(productIdList,id=>getProductById(id)))
}

export default {
  queryProductByCategoryId,
  getProductById,
  getProductsByMultiId
}

