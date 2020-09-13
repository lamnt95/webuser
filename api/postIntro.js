import _ from "lodash"
import api from "./api"

function getPostIntroDetail() {
  const url = "/restaurant-cake-api/v1/user/post-intro?page=0&size=10"
  return api.get(url).then(({ data }) => _.head(data.content)).catch(e => e)
}

export default {
  getPostIntroDetail,
}

