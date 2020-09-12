import _ from "lodash";
import slug from "./slug"

function mapMenu(data) {
  const menu = _.map(data, i => ({ id: i.id, route: `/san-pham/${slug.toSlug(i.name + "-" + i.id)}`, name: i.name, scrollTo: "#products" }))
  return menu
}

function getCategoryId(query) {
  return _.last(_.split(query, "-"))
}

function getProductId(query) {
  return _.last(_.split(query, "-"))
}

export default {
  mapMenu,
  getCategoryId,
  getProductId
}