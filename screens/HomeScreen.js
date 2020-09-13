import _ from "lodash"
import React, { useEffect, useState } from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import Slide from "../components/header/Slide"
import Intro from "../components/Intro"
import Products from "../components/Products"
import Story from "../components/Story"
import Policy from "../components/Policy"
import VideoIntro from "../components/VideoIntro"
import Footer from "../components/Footer"
import Map from "../components/Map"
import { useRouter } from "next/router"
import api from "../api"
import utils from "../utils"
import { v4 as uuidv4 } from 'uuid';

function getSlide(images) {
  return _.map(images, i => ({ id: uuidv4(), src: i })) || []
}

export default function HomeScreen() {
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const [keywordSearch, setKeywordSearch] = useState();
  const [postIntro, setPostIntro] = useState();
  const router = useRouter()
  const categoryId = utils.getCategoryId(_.get(router, "query.id"));

  const data = categoryId ? category : postIntro

  const { intro, story, userManual, policy, videoIntro } = data || {};

  const images = _.get(data, "images") || [];
  const storyMedias = _.get(data, "storyMedias") || [];

  console.log("data", data)

  useEffect(() => {
    api.getCategory(categoryId).then(res => res.data).then(setCategory);
    api.getPostIntroDetail().then(setPostIntro);
    api.queryProduct({ categoryId }).then(res => _.get(res, "data.content")).then(setProducts);
  }, [categoryId])

  const onChangeSearch = (keyword) => {
    setKeywordSearch(keyword)
  }

  const onSubmitSearch = () => {
    api.queryProduct({ productName: keywordSearch, categoryId }).then(res => _.get(res, "data.content")).then(setProducts)
  }


  return <div>
    <Header onChange={onChangeSearch} onSubmit={onSubmitSearch} />
    <Menu />
    <Slide slideData={getSlide(images)} />
    <Intro intro={intro} />
    <Products data={products} />
    <Story story={story} storyMedias={storyMedias} />
    <Policy userManual={userManual} policy={policy} />
    <VideoIntro videoIntro={videoIntro} />
    <Map />
    <Footer />
  </div>
}