import _ from "lodash";
import React, { useEffect, useState, useMemo } from "react"
import { Input, Dropdown } from 'semantic-ui-react'
import store from "../redux"
import { useSelector } from "react-redux"
import api from "../api"
import utils from "../utils"


function ProductRow({ item, index }) {
  return <tr key={item.id}>
    <th scope="row">{index + 1}</th>
    <td>{item.name}</td>
    <td>{item.code}</td>
    <td>{item.quantity}</td>
    <td>{item.price}</td>
    <td>{item.priceAfterPromotion}</td>
    <td>{item.totalPrice}</td>
  </tr>
}

const couponPolicy = [{ id: "ratePromotionCoupon", type: "rate" }, { id: "volumeFeeShipPromotionCoupon", type: "volume" }, { id: "volumePromotionCoupon", type: "volume" }]

function getCouponPolicyActive(promotion = {}) {
  for (let i = 0; i < couponPolicy.length; i += 1) {
    if (_.isNumber(promotion[couponPolicy[i].id])) return {
      id: couponPolicy[i].id,
      type: couponPolicy[i].type,
      data: promotion[couponPolicy[i].id]
    };
  }
}

export default function CartMoney({ onChange, onSubmit }) {

  const products = useSelector(store.selectors.cart.getProducts);
  const [productDetail, setProductDetail] = useState();
  const [promotionCoupon, setPromotionCoupon] = useState();
  const [coupon, setCoupon] = useState(0);
  const promotionCouponDropdown = _.map(promotionCoupon, i => ({
    key: i.codeCoupon,
    text: i.codeCoupon,
    value: i.codeCoupon
  }))
  const promotionCouponKeyBy = _.keyBy(promotionCoupon, "codeCoupon");
  const discount = getCouponPolicyActive(promotionCouponKeyBy[coupon]) || {};
  const discountPrice = discount.data || 0
  const totalPrice = useMemo(() => _.sum(_.map(productDetail, "totalPrice")), productDetail) || 0
  const finalPrice = discount.type === "rate" ? totalPrice * (1 - discountPrice / 100) : (totalPrice - discountPrice)
  useEffect(() => {
    const productIdList = _.map(products, i => i.productId)
    api.getProductsByMultiId(productIdList).then(res => utils.mapPriceProduct(res, products)).then(setProductDetail)
    api.getPromotionCoupon().then(setPromotionCoupon);
  }, [products])

  const onChangeCoupon = (e, data) => {
    const { value } = data || {}
    onChange({ coupon: value })
    setCoupon(value)
  }

  return <div className="cart_container">
    <h2 className="cart_container_title">Thông tin đơn hàng</h2>
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
            <th scope="col">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {_.map(productDetail, (i, index) => <ProductRow
            item={i}
            index={index}
          />)}
          <tr>
            <th colSpan={5}>Tổng tiền</th>
            <td className="cart_container_originprice">{totalPrice}</td>
          </tr>
          <tr>
            <th colSpan={5} style={{ verticalAlign: "middle" }}>Mã khuyến mại</th>
            <td>
              <Dropdown
                style={{ width: 200 }}
                placeholder='Chọn mã khuyến mại'
                fluid
                selection
                value={coupon}
                options={promotionCouponDropdown}
                onChange={onChangeCoupon}
              />
            </td>
          </tr>
          <tr>
            <th colSpan={5}>Tiền khuyến mại</th>
            <td className="cart_container_saleprice">{discountPrice}{discount.type === "rate" && "%"}</td>
          </tr>
          <tr>
            <th colSpan={5}>Số tiền thanh toán thực tế</th>
            <td className="cart_container_realprice">{finalPrice < 0 ? 0 : finalPrice || 0}</td>
          </tr>
        </tbody>
      </table>
      <div className="cart_container_submit" style={{ height: '50px' }}>
        <div className="cart_container_submit_text" onClick={onSubmit}>Đặt hàng</div>
      </div>
    </div>
  </div>
}