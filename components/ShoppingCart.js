import _ from 'lodash'
import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import CartInfo from "./CartInfo"
import CartMoney from "./CartMoney"
import utils from "../utils"
import store from "../redux"
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { Router } from "../routes"

const CART_INIT = {
  coupon: null,
  receivedDate: new Date(),
  userInfoOrder: {
    address: {
      addressDetail: null,
      addressType: "COMPANY"
    },
    email: null,
    fullName: null,
    phone: null,
    sex: "MALE",
  }
}

function ModalExampleCloseIcon({ open, setOpen }) {
  console.log("ModalExampleCloseIcon", open)
  return (
    <Modal
      closeIcon
      open={open}
      // trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {/* <Header icon='archive' content='Archive Old Messages' /> */}
      <Modal.Content>
        <p>
          Đơn hàng của Quý khách đã được tạo thành công !
          Vui lòng vào địa chỉ email đã khai báo để kiểm tra lại đơn hàng.”
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}


export default function ShoppingCart(props) {
  const [cart, setCart] = useState({ payment: "ONLINE" })
  const [isPreview, setIsPreview] = useState(false)
  const [open, setOpen] = useState(false)
  const { payment } = cart || {}

  const [messageError, setMessageError] = useState({});
  const dispatch = useDispatch();
  const userInfoOrderFormData = useSelector(store.selectors.cart.getUserInfoOrderFormData);

  const onChangeFormInfo = (formData) => {
    const { receivedDate, addressDetail, addressType, email, fullName, phone, sex, provinceCode, districCode } = formData || {};
    const address = { addressDetail, addressType, provinceCode, districCode }
    const userInfoOrder = { address, email, fullName, phone, sex }
    const receivedDateFormated = utils.formatDate(receivedDate)
    const cartNew = {
      ...cart,
      receivedDate: receivedDateFormated,
      userInfoOrder
    }
    setCart(cartNew)
    dispatch(store.actions.cart.insertStart({ cart: cartNew }))
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = utils.validateOrder({ ...formData, receivedDate: receivedDateFormated, }) || {}
      setMessageError(messageErrorNew);
    }
  }

  const onChangeCartMoney = (formData) => {
    const { coupon } = formData || {};
    const cartNew = {
      ...cart,
      coupon,
    }
    setCart(cartNew)
    dispatch(store.actions.cart.insertStart({ cart: cartNew }))
  }

  const onChangeCartMoneyPayment = (formData) => {
    const { payment } = formData || {};
    const cartNew = {
      ...cart,
      payment,
    }
    console.log("onChangeCartMoneyPayment", cartNew)
    setCart(cartNew)
    dispatch(store.actions.cart.insertStart({ cart: cartNew }))
  }



  const orderSuccess = () => {
    toast.success("Đặt hàng thành công")
    setIsPreview(true);
    setOpen(true);
  }

  const onValidate = () => {
    const messageError = utils.validateOrder(userInfoOrderFormData) || {}
    setMessageError(messageError);
    return _.isEmpty(messageError);
  }

  const onSubmit = () => {
    if (onValidate()) {
      dispatch(store.actions.cart.orderStart(null, { onSuccess: orderSuccess }))
    }
  }



  return <div className="shopping_cart_container">
    <CartInfo onChange={onChangeFormInfo} messageError={messageError} isDisable={isPreview} />
    <CartMoney
      payment={payment}
      onChange={onChangeCartMoney}
      onChangePaymentProp={onChangeCartMoneyPayment}
      onSubmit={onSubmit} onValidate={onValidate} messageError={messageError} isDisable={isPreview} />
    <div style={{ flexDirection: "column" }}>
      <ModalExampleCloseIcon open={open} setOpen={setOpen} />
    </div>
  </div>


}