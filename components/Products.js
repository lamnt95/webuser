import _ from "lodash"
import React from "react"
import Product from "./Product"
import utils from "../utils"
import { Router } from "../routes"

export default function Products({ data = [] }) {
  const onClick = (name, id) => {
    const route = `/chi-tiet-san-pham/${utils.toSlug(name)}-${id}`
    Router.pushRoute(route)
  }
  const length = _.size(data)
  return <div className={`products ${length == 1 ? "products-one-item" : ""}`} id="products">
    {_.map(data, i => <Product onPress={onClick} price={i.price} name={i.name} id={i.id} key={i.id} image={i.image} unit={i.unit} priceAfterPromotion={i.priceAfterPromotion} />)}
  </div>
}