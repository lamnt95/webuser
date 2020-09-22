import _ from "lodash"
import api from "./api"

function queryPost(page = 0, size = 20) {
  const url = `/restaurant-cake-api/v1/user/useful-information?page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data.content)
}

function getPostDetail(postId) {
  return queryPost(0, 1000).then(res => _.head(_.filter(res, i => i.id == postId) || []) || {})
}

function increasePostView(postId) {
  const url = `/restaurant-cake-api/v1/user/useful-information/increment-view/${postId}`;
  return api.get(url);
}


export default {
  queryPost,
  getPostDetail,
  increasePostView
}

