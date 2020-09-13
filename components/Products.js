import _ from "lodash"
import React from "react"
import Product from "./Product"
import { useRouter } from "next/router"
import utils from "../utils"

export default function Products({ data = [] }) {
  const router = useRouter()

  const onClick = (name, id) => {
    const route = `/chi-tiet-san-pham/${utils.toSlug(name)}-${id}`
    router.push(route)
  }

  return <div className="products" id="products">
    {_.map(data, i => <Product onPress={onClick} price={i.price} name={i.name} id={i.id} key={i.id} image={i.image} unit={i.unit} />)}
  </div>
}