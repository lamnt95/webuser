import _ from "lodash"
import api from "./api"

function queryCategory() {
  const url = "/restaurant-cake-api/v1/user/categories"
  return api.get(url).then(({ data }) => data)
}


function getCategory(id) {
  const url = `/restaurant-cake-api/v1/user/categories/${id}`
  return api.get(url)
}

export default {
  queryCategory,
  getCategory,
}

