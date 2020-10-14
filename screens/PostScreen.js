import _ from "lodash";
import React, { useEffect, useState } from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import VideoIntro from "../components/VideoIntro"
import Footer from "../components/Footer"
import Map from "../components/Map"
import { useRouter } from "next/router"
import api from "../api"
import utils from "../utils"
import Paging from "../components/Paging"


function TopProductItem() {
  return <div className="post-product-topContent-product">
    <img src="https://live.staticflickr.com/65535/50358783101_daa936c77c_k.jpg" className="top-img" />
    <div className="text">
      <div className="name">Bánh cốm nhân đậu xanh (loại nhỏ)</div>
      {/* <div className="price">5000đ/cái</div> */}
    </div>
  </div>
}

function TopPostItem() {
  return <div className="post-product-topContent-product">
    <img src="https://live.staticflickr.com/65535/50358783101_daa936c77c_k.jpg" className="top-img" />
    <div className="text">
      <div className="name">Tin tức hữu ích</div>
    </div>
  </div>
}

function PostItem({ data = {} }) {
  const { id, title, viewQuantity, summary = "Trường tổng quan thông tin hữu ích", updatedDate } = data || {}
  return <div className="post-preview-item-container" key={id}>
    <img src="https://live.staticflickr.com/65535/50358783101_daa936c77c_k.jpg" className="post-img" />
    <div className="post-preview-item" key={id}>
      <div className="header">
        <div className="title">
          {title}
        </div>
        <div className="info">
          <i className="fas fa-clock icon-clock" />
          <div className="date">{utils.formatDate(updatedDate)}</div>
          <div className="seperate">-</div>
          <i className="fas fa-eye icon-eye" />
          <div className="view">Lượt xem {utils.formatMoney(viewQuantity)}</div>
        </div>
      </div>
      <div className="content">
        <span className="text">
          {summary}
        </span>
        <span className="text-more">
          Đọc thêm
        </span>
        {/* <div className="foot">
          <a className="btn" href={`/chi-tiet-bai-viet/${id}`} target="blank">
            XEM THÊM &gt;&gt;
          </a>
        </div> */}
      </div>
    </div>
  </div >
}

export default function PostScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.queryPost().then(setProducts)
  }, [])

  return <div>
    <Header />
    <Menu />
    <div className="post">
      <div className="post-left">
        <div className="post-product-top">
          <div className="post-product-topHeader">
            <i className="fas fa-bars icon-bars" />
            <div className="post-product-topHeaderText">
              SẢN PHẨM NỔI BẬT
            </div>
          </div>
          <div className="post-product-topContent">
            {_.map(products, i => <TopProductItem />)}
          </div>
        </div>
        <div className="post-product-top">
          <div className="post-product-topHeader">
            {/* <i className="fas fa-bars icon-bars" /> */}
            <div className="post-product-topHeaderText">
              Tin tức nhiều người đọc
            </div>
          </div>
          <div className="post-product-topContent">
            {_.map(products, i => <TopPostItem />)}
          </div>
        </div>
      </div>
      <div className="post-right" style={{ display: "flex", flexDirection: "column" }}>
        <div className="post-product-topHeader">
          <div className="post-product-topHeaderText">
            Tin tức
          </div>
        </div>
        <div className="post-preview-item-wrapper">
          {_.map(products, i => <PostItem data={i} />)}
        </div>
        <div style={{display:"flex", justifyContent:"center", paddingBottom:"30px", paddingTop:"15px"}}>
          <Paging total={10}/>
        </div>
      </div>
    </div>
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}