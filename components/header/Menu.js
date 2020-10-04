import _ from "lodash"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import api from "../../api"
import utils from "../../utils"
import { Router } from "../../routes";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left:20px;
  padding-right:20px;
  height:70px;
  background-color:#bebf6e;
  justify-content:space-between;
`;

const Left = styled.div`
  display:flex;
  align-items:center;
`;

const Logo = styled.img``;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
`;

const TabWrapper = styled.div`
  height:50px;
  background-color:${props => props.isActive ? "#eceac4" : "transparent"};
  padding-left:5px;
  padding-right:5px;
  margin-left:5px;
  margin-right:5px;
  display:flex;
  align-items:center;
  cursor:pointer;
  &:hover{
    background-color:#d8d37d;
  }
`;

const Tab = styled.div`
  text-transform: uppercase;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #7E2024;
  cursor:pointer;
`;

export default function Menu() {
  const router = useRouter();
  const [menu, setMenu] = useState();
  const pathname = "/san-pham/" + _.get(router, "query.id")
  useEffect(() => {
    api.queryCategory().then(data => {
      const menu = utils.mapMenu(data);
      setMenu(menu);
    })
  }, [])

  const onClick = (route, scrollTo) => {
    const path = `${route}${scrollTo || "#"}`;
    console.log("router menu", path)
    Router.pushRoute(path)
  }
  return <Container>
    <Left>
      <Logo src="/logo2.png" style={{ width: 130 }} />
    </Left>
    <Right>
      <TabWrapper key="/" isActive={"/" == pathname} onClick={() => onClick("/")}>
        <Tab>TRANG CHỦ </Tab>
      </TabWrapper>
      <TabWrapper key="/gioithieu" isActive={"/gioithieu" == pathname} onClick={() => onClick("/gioithieu", "#intro")}>
        <Tab>GIỚI THIỆU </Tab>
      </TabWrapper>
      {_.map(menu, i => <TabWrapper key={i.id} isActive={i.route == pathname} onClick={() => onClick(i.route, i.scrollTo)}>
        <Tab>{i.name}</Tab>
      </TabWrapper>)}
      <TabWrapper key="/baiviet" isActive={"/baiviet" == pathname} onClick={() => onClick("/baiviet")}>
        <Tab>THÔNG TIN HỮU ÍCH</Tab>
      </TabWrapper>
    </Right>
  </Container>
}