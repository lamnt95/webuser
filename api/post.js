import _ from "lodash"
import api from "./api"

function queryPost() {
  const url = "/restaurant-cake-api/v1/user/useful-information?page=0&size=20"
  return api.get(url).then(({ data }) => data.content)
}

function getPostDetail(postId) {
  return queryPost().then(res => _.head(_.filter(res, i => i.id == postId) || []) || {})
}

function increasePostView(postId){
  const url = `/restaurant-cake-api/v1/user/useful-information/increment-view/${postId}`;
  return api.get(url);
}


export default {
  queryPost,
  getPostDetail,
  increasePostView
}

