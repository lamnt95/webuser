import _ from "lodash"
import api from "./api"

function queryCategory() {
  const url = "/restaurant-cake-api/v1/user/categories"
  return api.get(url).then(({ data }) => data)
}


function getCategory(id) {
  return queryCategory().then(res => _.head(_.filter(res, i => i.id == id))).catch(e => e)
}

export default {
  queryCategory,
  getCategory,
}

