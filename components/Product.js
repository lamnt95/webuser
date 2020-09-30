import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import store from "../redux"
import { toast } from 'react-toastify';
import utils from "../utils"

const addProductSuccess = () => {
  toast.success("Thêm vào giỏ hàng thành công")
}

export default function Product(props) {
  const { onPress, name, price, id, image, unit, priceAfterPromotion } = props;

  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    productId: id,
    productQuantity: 1
  })
  const { productQuantity } = product;
  const isPriceDiffPriceAfterPromotion = price !== priceAfterPromotion;
  const isPromotion = isPriceDiffPriceAfterPromotion && _.isNumber(priceAfterPromotion)

  const onDescreare = () => {
    const newProductQuantity = productQuantity - 1 < 1 ? 1 : productQuantity - 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onIncreare = () => {
    const newProductQuantity = productQuantity + 1 < 1 ? 1 : productQuantity + 1
    setProduct({ ...product, productQuantity: newProductQuantity })
  }

  const onClickAddToCart = () => {
    if (productQuantity === 0) return;

    dispatch(store.actions.cart.insertStart({ product }, { onSuccess: addProductSuccess }))
  }

  return <div className="product_container">
    <img src={image} className="product_img" onClick={() => onPress(name, id)} />
    <div className="product_name">
      {name}
    </div>
    <div className="product_buyWrapper">
      <div className={`product_price_text ${isPromotion ? "product_price_text_have_promotion" : ""}`}>Giá bán: </div>
      <div className={`product_price ${isPromotion ? "product_price_have_promotion" : ""}`}>{utils.formatMoney(price)}/{unit}</div>
    </div>
    {isPromotion && <div className="product_buyWrapper">
      <div className="product_price_text">Giá khuyến mại: </div>
      <div className="product_price">{utils.formatMoney(priceAfterPromotion)}/{unit}</div>
    </div>}
    <div className="product_book">
      <div className="left">
        <div className={`minus ${productQuantity == 1 ? "minus-zero" : ""}`} onClick={onDescreare}>-</div>
        <input type="text" value={productQuantity} data-id="00366373-aeab-4980-b416-e16af97df19a" className="incart" />
        <div className="plus" onClick={onIncreare}>+</div>
      </div>
      <div className="right">
        <div className="order" onClick={onClickAddToCart}>Đặt hàng</div>
      </div>
    </div>
  </div>
}