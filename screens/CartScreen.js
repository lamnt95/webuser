import React from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
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