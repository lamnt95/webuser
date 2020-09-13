import _ from 'lodash'
import React, { useEffect, useState } from "react"
import ProductSlide from "./ProductSlide"
import { useDispatch } from "react-redux"
import store from "../redux"
import { toast } from 'react-toastify';

const addProductSuccess = () => {
  toast.success("Thêm vào giỏ hàng thành công")
}

export default function ProductDetail(props) {
  const { onPress, data } = props;
  const [product, setProduct] = useState();
  const { name, code, price, priceAfterPromotion, productQuantity, description, subImages, id, unit } = product || {}
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(data)
  }, [data])

  const onDescreare = () => {
    const newProductQuantity = productQuantity - 1 < 0 ? 0 : productQuantity - 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onIncreare = () => {
    const newProductQuantity = productQuantity + 1 < 0 ? 0 : productQuantity + 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onClickAddToCart = () => {
    if (productQuantity === 0 || _.isNull(productQuantity)) return;
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
        <div className={`price ${priceAfterPromotion ? "priceWithSale" : ""}`}>Giá gốc: {price}/{unit}</div>
        {priceAfterPromotion && <div className="price_sale">Giá khuyến mại:
          <span className="price_sale_number">
            {priceAfterPromotion}/{unit}
          </span>
        </div>}
        <div className="product_book" style={{ justifyContent: "flex-start", marginTop: 20 }}>
          <div className="left">
            <div className="minus" onClick={onDescreare}>-</div>
            <input type="text" value={productQuantity || 0} data-id="00366373-aeab-4980-b416-e16af97df19a" className="incart" />
            <div className="plus" onClick={onIncreare}>+</div>
          </div>
          <div className="right">
            <div className="order" onClick={onClickAddToCart}>Đặt mua</div>
          </div>
        </div>
      </div>
    </div>
    <div className="product_detail_info">
      <div className="title">Thông tin sản phẩm</div>
      <div className="content">
        {description}
      </div>
    </div>
  </div>
}