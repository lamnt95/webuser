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

export default function HomeScreen() {
  return <div>
    <Header />
    <Menu />
    <Slide />
    <Intro />
    <Products />
    <Story />
    <Policy />
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}