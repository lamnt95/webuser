import _ from "lodash";
import React from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import VideoIntro from "../components/VideoIntro"
import Footer from "../components/Footer"
import Map from "../components/Map"
import { useRouter } from "next/router"

const products = new Array(10).fill(0)

function TopProductItem() {
  return <div className="post-product-topContent-product">
    <img src="https://via.placeholder.com/250x200/98ad3f" className="top-img" />
    <div className="text">
      <div className="name">Bánh cốm nhân đậu xanh (loại nhỏ)</div>
      <div className="price">5000đ/cái</div>
    </div>
  </div>
}

function TopPostItem() {
  return <div className="post-product-topContent-product">
    <img src="https://via.placeholder.com/250x200/98ad3f" className="top-img" />
    <div className="text">
      <div className="name">Tin tức hữu ích</div>
    </div>
  </div>
}

function PostItem({onPress}) {
  return <div className="post-preview-item">
    <div className="header">
      <div className="title">
        Tin tức hữu ích
    </div>
      <div className="info">
        <i className="fas fa-clock icon-clock" />
        <div className="date">dd/mm/yyyy</div>
        <div className="seperate">-</div>
        <i className="fas fa-eye icon-eye" />
        <div className="view">Lượt xem</div>
      </div>
    </div>
    <div className="content">
      <div className="text">
        Nội dung hiển thị tại bản tin (có chỗ khai báo riêng, không phải lấy từ câu đầu tiên của nội dung bài viết)
    </div>
      <div className="foot">
        <div className="btn" onClick={onPress}>
          XEM THÊM &gt;&gt;
      </div>
      </div>
    </div>
  </div>
}

export default function PostScreen() {
  const router = useRouter()
  const viewmore = () => {
    router.push("/chitietbaiviet")
  }
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
            <i className="fas fa-bars icon-bars" />
            <div className="post-product-topHeaderText">
              Tin tức hữu ích
            </div>
          </div>
          <div className="post-product-topContent">
            {_.map(products, i => <TopPostItem />)}
          </div>
        </div>
      </div>
      <div className="post-right">
        <div className="post-preview-item-wrapper">
          {_.map(products, i => <PostItem onPress={viewmore}/>)}
        </div>
      </div>
    </div>
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}