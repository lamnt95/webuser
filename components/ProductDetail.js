import _ from 'lodash'
import React, { useEffect, useState } from "react"
import ProductSlide from "./ProductSlide"
import { useDispatch } from "react-redux"
import store from "../redux"
import { toast } from 'react-toastify';
import styled from "styled-components";
import utils from "../utils"

const addProductSuccess = () => {
  toast.success("Thêm vào giỏ hàng thành công")
}

const ListProduct = styled.div`
  display: flex;
  flex-direction: row;
  flex:1;
  width: 100%;
  justify-content:center;
`;
const ListProduct_TitleWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 100px;
`;
const ListProduct_Title = styled.div`
  display: flex;
  text-align: center;
  font-family: Snell;
  flex:1;
  font-size: 36px;
  font-weight: 500;
  color:rgb(45, 55, 72);
  justify-content: center;
`;
const ListProduct_Line = styled.div`
  display: flex;
  position: absolute;
  flex:1;
  top: 23px;
  width: 100%;
  height: 2px;
  background-color: rgb(45 55 72 / 14%);
`;

export default function ProductDetail(props) {
  const { onPress, data } = props;
  const [product, setProduct] = useState();
  const { name, code, price, productQuantity, description, subImages, id, unit, summary, priceAfterPromotion } = product || {}
  const dispatch = useDispatch();

  const isPriceDiffPriceAfterPromotion = price !== priceAfterPromotion;
  const isPromotion = isPriceDiffPriceAfterPromotion && _.isNumber(priceAfterPromotion)

  console.log("ProductDetail", product)

  useEffect(() => {
    setProduct(data)
  }, [data])

  const onDescreare = () => {
    const newProductQuantity = productQuantity - 1 < 1 ? 1 : productQuantity - 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onIncreare = () => {
    const newProductQuantity = productQuantity + 1 < 1 ? 1 : productQuantity + 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onClickAddToCart = () => {
    if (productQuantity === 1 || _.isNull(productQuantity)) return;
    const product = {
      productId: id,
      productQuantity
    }
    dispatch(store.actions.cart.insertStart({ product }, { onSuccess: addProductSuccess }))
  }

  return <div className="product_detail">
    <div className="product_detail_container">
      <div className="slide-wrapper">
        <ProductSlide images={subImages} />
      </div>
      <div className="buy">
        <div className="name" onClick={onPress}>
          {name}
        </div>
        <div className="product_code">
          Mã sản phẩm: {code}
        </div>
        <div className={`price ${isPromotion ? "price_have_promotion" : ""}`}>{utils.formatMoney(price)}/{unit}</div>
        {isPromotion && <div className="price_sale">
          <span className="price_sale_number">
            {utils.formatMoney(priceAfterPromotion)}/{unit}
          </span>
        </div>}
        <div className="product_line"></div>
        <div className="product_summary" dangerouslySetInnerHTML={{ __html: summary }} />
        <div className="product_book" style={{ justifyContent: "flex-start", marginTop: 60 }}>
          <div className="left">
            <div className={`minus ${productQuantity == 1 ? "minus-zero" : ""}`} onClick={onDescreare}>-</div>
            <input type="text" value={productQuantity || 1} data-id="00366373-aeab-4980-b416-e16af97df19a" className="incart" />
            <div className="plus" onClick={onIncreare}>+</div>
          </div>
          <div className="right">
            <div className="order" onClick={onClickAddToCart}>Đặt hàng</div>
          </div>
        </div>
      </div>
    </div>
    <div className="product_detail_info">
      <div className="title">Thông tin sản phẩm</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: description }}>
      </div>
    </div>
    <ListProduct>
      <ListProduct_TitleWrapper>
        <ListProduct_Line />
        <ListProduct_Title >
          <div style={{ backgroundColor: "#ece9c4", height: "40px", lineHeight: "40px", zIndex: 100, paddingLeft: "20px", paddingRight: "20px" }}>Sản phẩm cùng nhóm hàng</div>
        </ListProduct_Title>
      </ListProduct_TitleWrapper>
    </ListProduct>
  </div>
}