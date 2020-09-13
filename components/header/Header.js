import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import store from "../../redux"

// const logo1 = require("../../public/logo1.jpg")

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
  background-color: #ece9c4;
  display:flex;
  justify-content:space-between;
  padding-left:55px;
  padding-right:55px;
  position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items:center;
`;

const Center = styled.div`
  display: flex;
  align-items:center;
`;

const Right = styled.div`
  display: flex;
  align-items:center;
`;

const Icon = styled.img`
  width: 90px;
  height: 70px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  width: 300px;
  padding: 0;
  background: #FFF7F7;
  border: 1px solid #C0BABA;
  border-radius: 7px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: Roboto;
  font-size: 14px;
  color:#000;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  &::placeholder{
    color: #C0BABA;
  }
  &:focus{
    outline: none;
  }
`;

const BtnSearch = styled.div`
  border: 1px solid #C0BABA;
  border-radius: 7px;
  background: #FFF7F7;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  border-left: none;
  display: flex;
  align-items:center;
  justify-content:center;
  width: 40px;
  display: flex;
`

const IconSearch = styled.i`
  color: #C8C1C1;
  font-size: 17px;
`

const CartBtn = styled.div`
  background-color: #d4d3d3;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items:center;
  justify-content:center;
  position: relative;
  margin-right: 50px;
  cursor: pointer;
`;

const IconCart = styled.i`
  color: #000;
  font-size: 15px;
`

const CountWrapper = styled.div`
  position: absolute;
  top:-5px;
  right:0px;
  width: 15px;
  height: 15px;
  background-color: #e42121;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`

const Count = styled.div`
  color: #fff;
  font-size: 12px;
`

const PhoneWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const PhoneIcon = styled.i`
  color: #111;
  font-size: 25px;
`;

const PhoneText = styled.div``;
const PhoneHotLine = styled.div`
  color: #7e7d72;
  font-size:14px;
`;
const PhoneNumber = styled.div`
  font-size:14px;
`;

export default function Header({ onChange = () => { }, onSubmit = () => { } }) {
  const count = useSelector(store.selectors.cart.getCountProduct);

  const router = useRouter()
  const goCart = () => {
    router.push("/giohang")
  }
  return <Container>
    <Left>
      <Icon src="/logo1.png" style={{ width: 60, height: 60 }} />
    </Left>
    <Center>
      <InputWrapper>
        <Input placeholder="Tìm kiếm sản phẩm" onChange={(e) => onChange(_.get(e, "target.value"))} />
        <BtnSearch onClick={onSubmit}>
          <IconSearch className="fas fa-search" />
        </BtnSearch>
      </InputWrapper>
    </Center>
    <Right>
      <CartBtn onClick={goCart}>
        <IconCart className="fas fa-shopping-cart" />
        <CountWrapper>
          <Count>{count}</Count>
        </CountWrapper>
      </CartBtn>
      <PhoneWrapper>
        <PhoneIcon className="fas fa-phone-alt" />
      </PhoneWrapper>
      <PhoneText>
        <PhoneHotLine>Gọi đặt hàng</PhoneHotLine>
        <PhoneNumber>0816.97.99.86</PhoneNumber>
      </PhoneText>
    </Right>
  </Container>
}