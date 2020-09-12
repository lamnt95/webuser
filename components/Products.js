import _ from "lodash"
import React, { useEffect, useState } from "react"
import Product from "./Product"
import { useRouter } from "next/router"
import api from "../api"
import utils from "../utils"

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState();
  const categoryId = utils.getCategoryId(_.get(router, "query.id"));

  useEffect(() => {
    api.queryProductByCategoryId({ categoryId }).then(setProducts);
  }, [categoryId])

  const onClick = (name, id) => {
    const route = `/chi-tiet-san-pham/${utils.toSlug(name)}-${id}`
    router.push(route)
  }

  return <div className="products" id="products">
    {_.map(products, i => <Product onPress={onClick} price={i.price} name={i.name} id={i.id} key={i.id} image={i.image} />)}
  </div>
}