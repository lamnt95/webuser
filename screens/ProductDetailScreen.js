import _ from "lodash"
import React, { useEffect, useState } from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import VideoIntro from "../components/VideoIntro"
import Footer from "../components/Footer"
import Map from "../components/Map"
import ProductDetail from "../components/ProductDetail"
import api from "../api"
import utils from "../utils"
import { useRouter } from "next/router"

export default function ProductDetailScreen() {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  const router = useRouter()
  const productId = utils.getCategoryId(_.get(router, "query.id"));
  const { videoIntro } = category || {};

  useEffect(() => {
    api.getProductById(productId).then(res => {
      const { categoryId } = res || {}
      setProduct({ ...res, productQuantity: 0 })
      if (!_.isUndefined(categoryId)) {
        api.getCategory(categoryId).then(setCategory)
      }
    })

  }, [productId])

  return <div>
    <Header />
    <Menu />
    <ProductDetail data={product} />
    <VideoIntro videoIntro={videoIntro} />
    <Map />
    <Footer />
  </div>
}