import _ from "lodash"
import React from "react"

function Info() {
  return <div className="info-wrapper">
    <div className="info">
      <div className="text">Họ và tên</div>
      <input className="input" placeholder="Nhập họ và tên" />
    </div>
    <div className="info">
      <div className="text">Giới tính</div>
      <div className="checkbox">
        <input type="checkbox" id="male" name="male" value="male" />
        <div className="label">Anh</div>
        <input type="checkbox" id="female" name="female" value="female" />
        <div className="label">Chị</div>
      </div>
    </div>
    <div className="info">
      <div className="text">Số điện thoại</div>
      <input className="input" placeholder="Nhập số điện thoại" type="number"/>
    </div>
    <div className="info">
      <div className="text">Địa chỉ</div>
      <input className="input" placeholder="Nhập địa chỉ" />
    </div>
  </div>
}

const products = [
  {
    id: 1,
    name: "Bánh cốm",
    price: 10000
  },
  {
    id: 2,
    name: "Bánh cốm",
    price: 20000
  },
  {
    id: 3,
    name: "Bánh cốm",
    price: 30000
  },
  {
    id: 4,
    name: "Bánh cốm",
    price: 40000
  }
]

function CartItem(props) {
  const { item } = props
  const { name, price } = item || {}
  return <tr>
    <td>{name}</td>
    <td>
      <input placeholder="Nhập số lượng" type="number" min={0} />
    </td>
    <td>{price}</td>
    <td>100000</td>
  </tr>
}
function CartList() {
  return <table className="cart-list">
    <tr>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Đơn giá</th>
      <th>Thành tiền</th>
    </tr>
    {_.map(products, i => <CartItem key={i.id} item={i} />)}
    <tr>
      <td colSpan={3}>Tổng tiền</td>
      <td>1000000</td>
    </tr>
  </table>
}

export default function Cart() {
  return <div className="cart">
    <Info />
    <CartList />
    <div className="foot">
      <div className="btn">
        THANH TOÁN &gt;&gt;
      </div>
    </div>
  </div>
}