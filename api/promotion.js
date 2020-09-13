import _ from 'lodash'
import api from "./api"

function getPromotionCoupon() {
  const url = "/restaurant-cake-api/v1/user/promotions/coupon";
  return api.get(url).then(({ data }) => data)
}

export default {
  getPromotionCoupon
}