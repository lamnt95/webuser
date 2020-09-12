import _ from "lodash"
import api from "./api"

function queryCategory(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/categories?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data.content)
}


function getCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/${id}`
  return api.get(url).then(({ data }) => data).catch(e => e)
}

export default {
  queryCategory,
  getCategory,
}

