import _ from "lodash";
import React, { useEffect, useState, useMemo } from "react"
import { Dropdown } from 'semantic-ui-react'
import store from "../redux"
import { useSelector, useDispatch } from "react-redux"
import api from "../api"
import utils from "../utils"
import ErrorText from "./ErrorText"
import styled from "styled-components"
import Paid from "./Paid";

const Td = styled.td`
  color: rgb(96, 98, 102);
  font-size: 16px;
  height: 89px;
  line-height: 89px;
`;

const Tr = styled.tr`
  &:hover{
    background-color: rgb(245, 247, 250);
  }
`

const WrapperBtn = styled.div`
  display: flex;
  height: 100%;
  width: 100%; 
  justify-content: center;
`;


const InfoGroup = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  `;

const Name = styled.div`
 color: rgb(96, 98, 102);
  font-size: 16px;
  height: 89px;
  line-height: 89px;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 5px;
`;

const Remove = styled.div`
  color: rgb(96, 98, 105);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  &:hover{
    color: red;
  }
`;


function ProductRow({ item, index, onRemove, isDisable }) {
  const { productQuantity, productId } = item || {}
  const dispatch = useDispatch();
  const onDescreare = () => {
    const newProductQuantity = productQuantity - 1 < 1 ? 1 : productQuantity - 1
    dispatch(store.actions.cart.insertStart({ product: { productId, productQuantity: newProductQuantity } }, { onSuccess: () => { } }))

  };
  const onIncreare = () => {
    const newProductQuantity = productQuantity + 1 < 1 ? 1 : productQuantity + 1
    dispatch(store.actions.cart.insertStart({ product: { productId, productQuantity: newProductQuantity } }, { onSuccess: () => { } }))
  };


  return <Tr key={item.productId}
    style={{
      color: "rgb(96, 98, 102)!important;", fontSize: "16px", justifyContent: "center",
      alignItems: "center",
    }}>
    <Td >
      <InfoGroup>
        <Name>
          {item.name}
        </Name>
        <Avatar src={item.image} />
      </InfoGroup>
    </Td>
    <Td style={{ textAlign: "right" }}>{utils.formatMoney(item.price) || 0}</Td>
    <Td style={{ textAlign: "right" }}>{utils.formatMoney(item.priceAfterPromotion) || 0}</Td>
    <Td>
      <WrapperBtn>
        <div className="product_book" style={{ display: "flex" }}>
          <div className="left" style={{ alignItems: "center" }}>
            <div className={`minus ${productQuantity == 1 ? "minus-zero2" : ""} ${isDisable ? "disable" : ""}`}
              disabled={isDisable}
              onClick={isDisable ? () => { } : onDescreare} style={{
                borderColor: "#c0c4cc", backgroundColor: "rgb(245, 247, 250)", borderTopLeftRadius:
                  "5px", borderBottomLeftRadius: "5px"
              }}>-</div>
            <input type="text" value={productQuantity} data-id="00366373-aeab-4980-b416-e16af97df19a" className="incart"
              disabled={isDisable}
              style={{ borderColor: "#c0c4cc", width: "100px" }} />
            <div className={`plus  ${isDisable ? "disable" : ""}`} onClick={isDisable ? () => { } : onIncreare}
              disabled={isDisable}
              style={{
                borderColor: "#c0c4cc", backgroundColor: "rgb(245, 247, 250)", borderTopRightRadius:
                  "5px", borderBottomRightRadius: "5px"
              }}>+</div>
          </div>
        </div>
      </WrapperBtn>
    </Td>

    <Td style={{ textAlign: "right" }}>{utils.formatMoney(item.totalCostAfterPromotion) || 0}</Td>
    <Td style={{ textAlign: "center" }}>
      {!isDisable && <Remove onClick={() => onRemove(item.productId)}>
        Xoá
      </Remove>}
    </Td>
  </Tr >
}

export default function promotionCoupon({ onChange, onSubmit, onValidate, messageError, isDisable }) {

  const dispatch = useDispatch();

  const products = useSelector(store.selectors.cart.getProducts);
  const cartInfo = useSelector(store.selectors.cart.getCart);

  const [isChecked, setIsChecked] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const [costDetail, setCostDetail] = useState();
  const { totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment } = costDetail || {}

  const [promotionCoupon, setPromotionCoupon] = useState();
  const [coupon, setCoupon] = useState(0);
  console.log("productDetail", productDetail)
  const promotionCouponDropdown = _.map(promotionCoupon, i => ({
    key: i,
    text: i,
    value: i
  }))

  useEffect(() => {
    const productIdList = _.map(products, i => i.productId)
    api.getProductsByMultiId(productIdList)
      .then(res => utils.mapPriceProduct(res, products))
      .then(i => { console.log("productDetailApiGet", i); return i; })
      .then(productDetail => {
        setProductDetail(productDetail);
        return productDetail;
      })
      .then((productDetail) => onCheck(true, productDetail))
      .then(() => api.getPromotionCoupon())
      .then(setPromotionCoupon)
  }, [])

  useEffect(() => {
    onCheck(true)
  }, [coupon, products])

  const onCheck = (isOnlyProduct, productDetailResponse) => {
    const productDetailInstance = !_.isEmpty(productDetailResponse) ? productDetailResponse : productDetail;
    if (!isOnlyProduct && !onValidate()) return;
    const { productDetails, receivedDate, userInfoOrder, coupon } = cartInfo || {}
    const cartBody = isOnlyProduct ? { productDetails, receivedDate: utils.formatDate(new Date()), coupon } : { productDetails, receivedDate, userInfoOrder, coupon }
    api.validateOrder(cartBody).then(res => {
      const { productDetails, totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment } = res || {}
      const productDetailKeyBy = _.keyBy(productDetailInstance, "productId") || {}
      const productDetailsNew = _.map(productDetails, i => ({ ...(productDetailKeyBy[i.productId] || {}), ...i }))
      setProductDetail(productDetailsNew)
      const costDetailNew = { totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment }
      setCostDetail(costDetailNew)
      setIsChecked(true)
    }).catch(() => {
      const productDetailKeyBy = _.keyBy(productDetailInstance, "productId") || {}
      const productDetailsNew = _.map(products, i => ({ ...(productDetailKeyBy[i.productId] || {}), ...i }))
      setProductDetail(productDetailsNew)
      if (_.size(products) === 0) {
        const { valueCoupon } = costDetail || {}
        const costDetailNew = { totalCost: 0, totalCostAfterPromotion: 0, totalRatePromotion: 0, valueCoupon, valuePayment: 0 }
        setCostDetail(costDetailNew)
      }
    })
  }

  const onChangeCoupon = (e, data) => {
    const { value } = data || {}
    onChange({ coupon: value })
    setCoupon(value)
  }

  const onRemoveProduct = (productId) => {
    dispatch(store.actions.cart.removeStart({ product: { productId } }))
  }

  return <> <div className="cart_container">
    <h2 className="cart_container_title">Thông tin đơn hàng</h2>
    <ErrorText errors={_.get(messageError, "productDetails") || {}} />
    <div className="list">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px" }}>Sản phẩm</th>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px", textAlign: "right" }}>Đơn giá</th>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px", textAlign: "right" }}>Đơn giá sau chiết khấu</th>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px", textAlign: "center" }}>Số lượng</th>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px", textAlign: "right" }}>Thành tiền</th>
            <th scope="col" style={{ borderTop: "0px", borderBottom: "0px", color: "rgb(144, 147, 153)!important", fontSize: "16px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {_.map(productDetail, (i, index) => <ProductRow
            item={i}
            index={index}
            isDisable={isDisable}
            onRemove={onRemoveProduct}
          />)}
          <tr style={{ backgroundColor: "rgb(245, 247, 250)" }}>
            <th colSpan={1} style={{ fontSize: "16px" }}>Tổng tạm tính</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center", fontFamily: "Taviraj", fontSize: "16px" }}>{utils.formatMoney(totalCost) || 0}</td>
          </tr>
          {/* <tr>
            <th colSpan={5}>Tổng tiền được khuyến mại</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{totalRatePromotion}</td>
          </tr>
          <tr>
            <th colSpan={5}>Tổng tiền sau khuyến mại</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{totalCostAfterPromotion}</td>
          </tr> */}
          {_.size(promotionCouponDropdown) > 0 && <tr style={{ backgroundColor: "rgb(245, 247, 250)" }}>
            <th colSpan={1} style={{ verticalAlign: "middle" }} style={{ fontSize: "16px" }}>Nhập mã khuyến mại</th>
            <td colSpan={5} >
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Dropdown
                  style={{ width: 200 }}
                  placeholder='Chọn mã khuyến mại'
                  fluid
                  selection
                  value={coupon}
                  disabled={isDisable}
                  options={promotionCouponDropdown}
                  onChange={onChangeCoupon}
                />
                {!isDisable && <div style={{ marginLeft: "20px", fontWeight: "700", cursor: "pointer" }} onClick={() => onChangeCoupon(null, { value: null })}>Xóa</div>}
              </div>
            </td>
          </tr>}
          <tr style={{ backgroundColor: "rgb(245, 247, 250)" }}>
            <th colSpan={1} style={{ fontSize: "16px" }}>Giảm trừ</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center", fontFamily: "Taviraj", fontSize: "16px" }}>{utils.formatMoney(valueCoupon) || 0}</td>
          </tr>
          <tr style={{ backgroundColor: "rgb(245, 247, 250)" }}>
            <th colSpan={1} style={{ fontSize: "16px" }}>Tổng thanh toán</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center", fontFamily: "Taviraj", fontSize: "16px" }}>{utils.formatMoney(valuePayment) || 0}</td>
          </tr>
        </tbody>
      </table>
      {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        {isChecked && <div className="cart_container_submit" style={{ height: '50px' }}>
          <div className="cart_container_submit_text" onClick={onSubmit}>Đặt hàng</div>
        </div>}
      </div> */}

    </div>
  </div>
    <Paid isDisable={isDisable} />
    {!isDisable ? <div className="cart_container" style={{ paddingTop: "20px", paddingBottom: "20px", marginBottom: "30px" }}>
      <div className="cart_container_submit" style={{ height: '50px' }}>
        {/* <div className="cart_container_submit_text" onClick={() => onCheck(false)}>Kiểm tra đơn hàng</div> */}
        <div className="cart_container_submit_text" onClick={onSubmit}>Đặt hàng</div>
      </div>
    </div> : <div style={{ width: "100%", marginBottom: "30px" }} />}
  </>
}