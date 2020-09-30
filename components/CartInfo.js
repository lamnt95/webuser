import _ from "lodash";
import React, { useState, useEffect } from "react"
import { Dropdown, Input, Button, Form } from 'semantic-ui-react'
import CartInfoCalendar from "./CartInfoCalendar"
import province from "./quanhuyen/tinh_tp.json"
import districtJSON from "./quanhuyen/quan_huyen.json"
import utils from "../utils"
import ErrorText from "./ErrorText"
import styled from "styled-components"

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  width: 100%;
`;

const ErrroSpace = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
`;

const provinceData = _.values(province);


function getDistrictData() {
  const districts = _.values(districtJSON);
  const districtGroup = _.groupBy(districts, "parent_code");
  return districtGroup
}
const district = getDistrictData();

const PROVINCE_HANOI = "01"
const DISTRIC_BADINH = "001"
const DICTRIC_IN_HANOI = district[PROVINCE_HANOI]

const FORM_INIT = {
  receivedDate: new Date(),
  addressDetail: null,
  addressType: "COMPANY",
  provinceCode: PROVINCE_HANOI,
  districCode: DISTRIC_BADINH,
  email: null,
  fullName: null,
  phone: null,
  sex: "MALE",
}

export default function CartInfo({ onChange, messageError }) {
  const [districtData, setDistricData] = useState(DICTRIC_IN_HANOI)
  const [formData, setFormData] = useState(FORM_INIT);
  const { receivedDate, addressDetail, addressType, email, fullName, phone, sex, provinceCode, districCode } = formData || {};

  useEffect(() => {
    onChange(formData)
  }, [formData])

  const onChangeText = (e) => {
    const { value, name } = e.target || {}
    setFormData({ ...formData, [name]: value })
  }

  const onChangeAddressType = (addressType) => {
    setFormData({ ...formData, addressType })
  }

  const onChangeSex = (sex) => {
    setFormData({ ...formData, sex })
  }

  const onChangeReceiveDate = (receivedDate) => {
    setFormData({ ...formData, receivedDate })
  }

  return <div className="cart_info_container">
    <h2 className="cart_container_title">Thông tin nhận hàng</h2>
    <div className="list">
      <div className="cart_info_item_row">
        <div className="cart_info_item">
          <label>Họ và tên</label>
          <Input type="text" id="Name" value={fullName} name="fullName" onChange={onChangeText} />
        </div>
        <ErrorText errors={_.get(messageError, "fullName") || {}} />

        <div className="cart_info_item">
          <label>Giới tính</label>
          <Form.Group inline>
            <Form.Radio
              style={{ fontSize: "16px" }}
              label='Anh'
              value='MALE'
              checked={sex === 'MALE'}
              onChange={() => onChangeSex("MALE")}
            />
            <Form.Radio
              label='Chị'
              value='FEMALE'
              checked={sex === 'FEMALE'}
              onChange={() => onChangeSex("FEMALE")}
            />
          </Form.Group>
        </div>
        <ErrorText errors={_.get(messageError, "sex") || {}} />

        <div className="cart_info_item">
          <label>Email</label>
          <Input type="email" id="Email" value={email} name="email" onChange={onChangeText} />
        </div>
        <ErrorText errors={_.get(messageError, "email") || {}} />

        <div className="cart_info_item">
          <label>Điện thoại</label>
          <Input type="text" id="Tel" value={phone} name="phone" onChange={onChangeText} />
        </div>
        <ErrorText errors={_.get(messageError, "phone") || {}} />

        <div className="cart_info_item">
          <label>Ngày nhận</label>
          <CartInfoCalendar date={receivedDate} onChange={onChangeReceiveDate} />
        </div>
        <ErrorText errors={_.get(messageError, "receivedDate") || {}} />

      </div>
      <div className="cart_info_item_row">
        <div className="cart_info_item">
          <label>Tỉnh thành phố</label>
          <Dropdown
            placeholder='Chọn tỉnh thành phố'
            fluid
            selection
            style={{ fontSize: "16px" }}
            value={provinceCode}
            options={provinceData}
            onChange={(e, { value }) => {
              setFormData({ ...formData, provinceCode: value })
              setDistricData(district[value])
            }}
          />
        </div>
        <ErrorText errors={_.get(messageError, "provinceCode") || {}} />

        <div className="cart_info_item">
          <label>Quận huyện</label>
          <Dropdown
            placeholder='Chọn quận huyện'
            fluid
            style={{ fontSize: "16px" }}
            value={districCode}
            selection
            options={districtData}
            onChange={(e, { value }) => {
              setFormData({ ...formData, districCode: value })
            }}
          />
        </div>

        <ErrorText errors={_.get(messageError, "districCode") || {}} />

        <div className="cart_info_item">
          <label>Địa chỉ nhận</label>
          <Input type="text" id="Address" value={addressDetail} name="addressDetail" onChange={onChangeText} />
        </div>
        <ErrorText errors={_.get(messageError, "addressDetail") || {}} />

        <div className="cart_info_item">
          <label>Loại địa chỉ</label>
          <div>
            <Button primary={addressType === "COMPANY"} onClick={() => onChangeAddressType("COMPANY")}
              style={{ fontSize: "16px" }}
            >Công ty</Button>
            <Button primary={addressType === "HOME"} onClick={() => onChangeAddressType("HOME")}
              style={{ fontSize: "16px" }}
            >Nhà riêng</Button>
          </div>
        </div>
        <ErrorText errors={_.get(messageError, "addressType") || {}} />

      </div>
    </div>
  </div>
}