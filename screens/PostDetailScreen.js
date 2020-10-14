import _ from "lodash";
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import VideoIntro from "../components/VideoIntro"
import Footer from "../components/Footer"
import Map from "../components/Map"
import api from "../api"
import utils from "../utils"
import { useRouter } from "next/router"

const products = new Array(10).fill(10)

export const ContentWrapper = styled.div`
  margin-top: 35px;
  img {
    width: 100%;
  }
`;

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

function PostItem({ data = {} }) {
  const { id, title, viewQuantity, updatedDate, content } = data || {}

  return <div className="post-preview-item">
    <div className="header">
      <div className="title">
        {title}
      </div>
      <div className="info">
        <i className="fas fa-clock icon-clock" />
        <div className="date">{utils.formatDate(updatedDate)}</div>
        <div className="seperate">-</div>
        <i className="fas fa-eye icon-eye" />
        <div className="view">Lượt xem {viewQuantity}</div>
      </div>
    </div>
    <div className="detail">
      <div className="text">
        <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  </div>
}

export default function PostScreen() {
  const [postDetail, setPostDetail] = useState({});

  const router = useRouter()
  const postId = _.get(router, "query.id")
  useEffect(() => {
    if (_.isUndefined(postId)) return;
    api.getPostDetail(postId).then(setPostDetail)
    api.increasePostView(postId)
  }, [postId])


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
          <PostItem data={postDetail} />
        </div>
      </div>
    </div>
    <VideoIntro />
    <Map />
    <Footer />
  </div>
}