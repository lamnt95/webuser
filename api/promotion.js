import _ from 'lodash'
import api from "./api"

function getPromotionCoupon() {
  const url = "/restaurant-cake-api/v1/admin/promotions?checkedStatus=APPROVE&page=0&size=1000";
  return api.get(url).then(({ data }) => data.content).then(res => _.filter(res, i => i.codeCoupon))
}

export default {
  getPromotionCoupon
}