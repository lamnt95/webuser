import React, { useState } from "react"
import { Dropdown, Input, TextArea, Form } from 'semantic-ui-react'

export default function Paid({ isDisable, onChangePayment, payment }) {
  return <div className="cart_container paid-container">
    <h2 className="cart_container_title">Vui lòng chọn hình thức thanh toán</h2>
    <div className="list">
      <Form.Group inline>
        <Form.Radio
          style={{ fontSize: "16px", color: "rgb(96, 98, 102)" }}
          label='Thanh toán bằng tiền mặt khi nhận hàng'
          value='CASH'
          checked={payment === 'CASH'}
          disabled={isDisable}
          onChange={() => {
            onChangePayment(null, { value: "CASH" });
          }}
        />
        <Form.Radio
          style={{ fontSize: "16px", color: "rgb(96, 98, 102)" }}
          label='Thanh toán trước bằng chuyển khoản'
          value='ONLINE'
          checked={payment === 'ONLINE'}
          disabled={isDisable}
          onChange={() => {
            onChangePayment(null, { value: "ONLINE" });
          }}
        />
      </Form.Group>
      {payment === 'ONLINE' && <div>
        <div className="paid_title" style={{ fontSize: "16px", color: "rgb(144, 147, 153)" }}>Thông tin tài khoản</div>
        <div className="paid_info">
          <div className="paid_info_key">Ngân hàng</div>
          <div className="paid_info_value">Ngân hàng ABCDXYS</div>
        </div>
        <div className="paid_info">
          <div className="paid_info_key">Chi nhánh</div>
          <div className="paid_info_value">Chi nhánh ABCDXYS</div>
        </div>
        <div className="paid_info">
          <div className="paid_info_key">Chủ tài khoản</div>
          <div className="paid_info_value">NGUYỄN VĂN A</div>
        </div>
        <div className="paid_info">
          <div className="paid_info_key">Số tài khoản</div>
          <div className="paid_info_value">ABCDXYZ123456</div>
        </div>
      </div>}
    </div>
  </div>
}