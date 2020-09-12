import React from "react"
import styled from "styled-components"
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
import ShoppingCart from "../components/ShoppingCart"

export default function CartScreen() {
  return <div>
    <Header />
    <Menu />
    <ShoppingCart />
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}