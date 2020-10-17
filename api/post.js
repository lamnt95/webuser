import _ from "lodash"
import api from "./api"

function queryPost(page = 0, size = 20) {
  const url = `/restaurant-cake-api/v1/user/useful-information?page=${page}&size=${size}`
  return api.get(url);
}

function getPostDetail(postId) {
  return queryPost(0, 10000).then(res => {
    return _.head(_.filter(_.get(res, "data.content"), i => i.id == postId) || []) || {};
  })
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

