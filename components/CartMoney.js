import _ from "lodash";
import React, { useEffect, useState, useMemo } from "react"
import { Dropdown } from 'semantic-ui-react'
import store from "../redux"
import { useSelector, useDispatch } from "react-redux"
import api from "../api"
import utils from "../utils"
import ErrorText from "./ErrorText"


function ProductRow({ item, index, onRemove }) {
  return <tr key={item.productId}>
    <th scope="row">{index + 1}</th>
    <td>{item.name}</td>
    <td>{item.code}</td>
    <td>{item.quantity}</td>
    <td>{item.price}</td>
    <td>{item.priceAfterPromotion}</td>
    <td>{item.totalCost}</td>
    <td>{item.totalRatePromotion}</td>
    <td>{item.totalCostAfterPromotion}</td>
    <td>
      <button onClick={() => onRemove(item.productId)}>
        Xoá
      </button>
    </td>
  </tr>
}

export default function promotionCoupon({ onChange, onSubmit, onValidate, messageError }) {

  const dispatch = useDispatch();

  const products = useSelector(store.selectors.cart.getProducts);
  const cartInfo = useSelector(store.selectors.cart.getCart);

  const [isChecked, setIsChecked] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const [costDetail, setCostDetail] = useState();
  const { totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment } = costDetail || {}

  const [promotionCoupon, setPromotionCoupon] = useState();
  const [coupon, setCoupon] = useState(0);

  const promotionCouponDropdown = _.map(promotionCoupon, i => ({
    key: i,
    text: i,
    value: i
  }))

  useEffect(() => {
    const productIdList = _.map(products, i => i.productId)
    api.getProductsByMultiId(productIdList).then(res => utils.mapPriceProduct(res, products)).then(setProductDetail)
    api.getPromotionCoupon().then(setPromotionCoupon);
  }, [products])

  const onCheck = () => {
    if (!onValidate()) return;
    const { productDetails, receivedDate, userInfoOrder, coupon } = cartInfo || {}
    const cartBody = { productDetails, receivedDate, userInfoOrder, coupon }
    api.validateOrder(cartBody).then(res => {
      const { productDetails, totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment } = res || {}
      const productDetailKeyBy = _.keyBy(productDetail, "productId") || {}
      const productDetailsNew = _.map(productDetails, i => ({ ...i, ...(productDetailKeyBy[i.productId] || {}) }))
      setProductDetail(productDetailsNew)
      const costDetailNew = { totalCost, totalCostAfterPromotion, totalRatePromotion, valueCoupon, valuePayment }
      setCostDetail(costDetailNew)
      setIsChecked(true)
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

  return <div className="cart_container">
    <h2 className="cart_container_title">Thông tin đơn hàng</h2>
    <ErrorText errors={_.get(messageError, "productDetails") || {}} />
    <div className="list">
      <table class="table table-bordered">
        <thead>
          <tr class="table-primary">
            <th scope="col">STT</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Đơn giá trước khuyến mại</th>
            <th scope="col">Đơn giá sau khuyến mại</th>
            <th scope="col">Thành tiền trước khuyến mại</th>
            <th scope="col">Thành tiền được khuyến mại</th>
            <th scope="col">Thành tiền sau khuyến mại</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {_.map(productDetail, (i, index) => <ProductRow
            item={i}
            index={index}
            onRemove={onRemoveProduct}
          />)}
          <tr>
            <th colSpan={5}>Tổng tiền</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{totalCost}</td>
          </tr>
          <tr>
            <th colSpan={5}>Tổng tiền được khuyến mại</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{totalRatePromotion}</td>
          </tr>
          <tr>
            <th colSpan={5}>Tổng tiền sau khuyến mại</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{totalCostAfterPromotion}</td>
          </tr>
          <tr>
            <th colSpan={5} style={{ verticalAlign: "middle" }}>Mã khuyến mại</th>
            <td colSpan={5} >
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Dropdown
                  style={{ width: 200 }}
                  placeholder='Chọn mã khuyến mại'
                  fluid
                  selection
                  value={coupon}
                  options={promotionCouponDropdown}
                  onChange={onChangeCoupon}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th colSpan={5}>Giá trị coupon</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{valueCoupon || 0}</td>
          </tr>
          <tr>
            <th colSpan={5}>Tổng tiền thanh toán thực tế</th>
            <td className="cart_container_originprice" colSpan={5} style={{ textAlign: "center" }}>{valuePayment}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <div className="cart_container_submit" style={{ height: '50px' }}>
          <div className="cart_container_submit_text" onClick={onCheck}>Kiểm tra đơn hàng</div>
        </div>
        {isChecked && <div className="cart_container_submit" style={{ height: '50px' }}>
          <div className="cart_container_submit_text" onClick={onSubmit}>Đặt hàng</div>
        </div>}
      </div>

    </div>
  </div>
}