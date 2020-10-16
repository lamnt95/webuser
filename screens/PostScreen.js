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
import { Router } from "../routes"

function TopProductItem({ data = {} }) {
 
  const { image, name, id } = data;

  const handleClick = () => {
    const route = `/chi-tiet-san-pham/${utils.toSlug(name)}-${id}`
    Router.pushRoute(route)
  }

  return <div className="post-product-topContent-product">
    <img src={image} className="top-img" />
    <div className="text">
      <div className="name" onClick={handleClick}>{name}</div>
    </div>
  </div>
}

function TopPostItem({ data = {} }) {
  const { title, id } = data;
  return <div className="post-product-topContent-product">
    <img src="https://live.staticflickr.com/65535/50358783101_daa936c77c_k.jpg" className="top-img" />
    <div className="text">
      <a className="name" href={`/chi-tiet-bai-viet/${id}`} target="_blank">{title}</a>
    </div>
  </div>
}

function PostItem({ data = {} }) {
  const {
    id, title, viewQuantity, summary = "Trường tổng quan bài viết mặc định",
    imageAvatarPost = "https://live.staticflickr.com/65535/50358783101_daa936c77c_k.jpg",
    updatedDate
  } = data || {}
  return <div className="post-preview-item-container" key={id}>
    <img src={imageAvatarPost} className="post-img" />
    <div className="post-preview-item" key={id}>
      <div className="header">
        <a className="title" href={`/chi-tiet-bai-viet/${id}`} target="_blank">
          {title}
        </a>
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
          {summary + " ... "}
        </span>
        <a className="text-more" href={`/chi-tiet-bai-viet/${id}`} target="_blank">
          Đọc thêm
        </a>
      </div>
    </div>
  </div >
}

export default function PostScreen() {
  const [products, setProducts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [post, setPost] = useState([])
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState()


  useEffect(() => {
    api.queryProduct({ size: 10000 }).then(res => {
      setProducts(_.get(res, "data.content"));
    });
    api.queryPost(0, 10000).then(res => {
      setAllPosts(_.get(res, "data.content"));
    });
  }, [])

  useEffect(() => {
    api.queryPost(page, 10).then(res => {
      setPost(_.get(res, "data.content"));
      setTotalPage(_.get(res, "data.totalPages"))
    });
  }, [page])

  return <div>
    <Header />
    <Menu />
    <div className="post">
      <div className="post-left">
        <div className="post-product-top">
          <div className="post-product-topHeader">
            <i className="fas fa-bars icon-bars" style={{ fontSize: "20px" }} />
            <div className="post-product-topHeaderText">
              Sản phẩm nổi bật
            </div>
          </div>
          <div className="post-product-topContent">
            {_.map(products, item => <TopProductItem data={item} key={item.id} />)}
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
            {_.map(allPosts, item => <TopPostItem data={item} key={item.id} />)}
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
          {_.map(post, i => <PostItem data={i} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "30px", paddingTop: "15px", backgroundColor: "#f3f0f5" }}>
          <Paging total={totalPage} current={page}
            onClickPaging={(index) => setPage(index)}
            onBack={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        </div>
      </div>
    </div>
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}