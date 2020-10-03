import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 1000px;
`;
const ContainerBorder = styled.div`
  border: 1px solid green;
  border-bottom: 0px;
  padding: 10px;
`;
const Footer = styled.div`
  border: 1px solid green;
  background-color: rgb(181 210 121);
  justify-content: center;
  display: flex;
`;
const FooterContent = styled.div`
  color: green;
  font-weight: bold;
`;

const Block = styled.div`
  display: flex;
  margin-top: ${props => props.top && props.top + "px"};
  margin-bottom: ${props => props.bottom && props.bottom + "px"};
  margin-left: ${props => props.left && props.left + "px"};
  margin-right: ${props => props.right && props.right + "px"};
  width: ${props => props.width ? props.width + "px" : "100%"};
  flex-direction: ${props => props.row ? "row" : "column"};
`;

const Title = styled.span`
  color: rgb(118, 146, 60);
  font-size: 13px;
  font-weight: bold;
`;

const Title2 = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;


const Title3 = styled.span`
  color: rgb(118, 146, 60);
  font-size: 16px;
  font-weight: bold;
`;



const Text = styled.span`
  color: black;
  font-size: 13px;
  margin-left: ${props => props.left && props.left + "px"};
  margin-right: ${props => props.right && props.right + "px"};
`;

const Table = styled.table`
  border: 1px solid green;
`;


const Tr = styled.tr`
`;


const Th = styled.th`
  padding: 10px;
  border: 1px solid green;
  text-align: center;
  color: green;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.td`
  border: 1px solid green;
  background-color:rgb(181 210 121);
  height: 8px;
`;

const Image = styled.img`
  width: ${props => props.width ? props.width + "px" : "100px"};
  width: ${props => props.width ? props.width + "px" : "100px"};
  margin-left: ${props => props.left && props.left + "px"};
  margin-right: ${props => props.right && props.right + "px"};
`;


const Td = styled.td`
  border: 1px solid green;
  text-align: ${props => props.align ? props.align : "right"};
  font-weight: ${props => props.weight ? props.weight : "nỏmal"};
  background-color:${props => props.bg ? props.bg : "white"};
  padding-left: 10px;
  padding-right: 10px;
`;


export default function Mail() {
  return <Container>
    <ContainerBorder>
      <Block>
        <Title>Xin chào anh Nguyễn Tùng Lâm</Title>
      </Block>
      <Block top={10} row>
        <Title>Xin chào anh Nguyễn Tùng Lâm</Title>
        <Text left={5} right={5}>{" cảm ơn anh đã tin tưởng sử dụng sản phẩm dịch vụ của "}</Text>
        <Title>Nguyên Hương</Title>
      </Block>
      <Block top={10}>
        <Text>Kính chúc anh có một ngày tràn đầy năng lượng</Text>
      </Block>
      <Block top={10}>
        <Text>Thông tin đơn hàng của anh như sau</Text>
      </Block>
      <Block top={10}>
        <Title>Mã đơn hàng: 20200927</Title>
      </Block>
      <Block top={20}>
        <Title2>Danh mục sản phẩm đã đặt mua</Title2>
        <Block top={20}>
          <Table>
            <Tr>
              <Th>Tên sản phẩm</Th>
              <Th>Mã sản phẩm</Th>
              <Th>Số lượng</Th>
              <Th>Đơn giá</Th>
              <Th>Giá sau chiết khấu</Th>
              <Th>Thành tiền</Th>
            </Tr>
            <Tr>
              <Td align="left">Bánh cốm 7 hoa</Td>
              <Td align="left">SP00011</Td>
              <Td>3</Td>
              <Td>7.000</Td>
              <Td>7.000</Td>
              <Td>21.000</Td>
            </Tr>
            <Tr>
              <Td align="left">Bánh cốm 7 hoa</Td>
              <Td align="left">SP00011</Td>
              <Td>3</Td>
              <Td>7.000</Td>
              <Td>7.000</Td>
              <Td>21.000</Td>
            </Tr>
            <Tr>
              <Td align="left">Bánh cốm 7 hoa</Td>
              <Td align="left">SP00011</Td>
              <Td>3</Td>
              <Td>7.000</Td>
              <Td>7.000</Td>
              <Td>21.000</Td>
            </Tr>
            <Tr>
              <Line colSpan="6" />
            </Tr>
            <Tr>
              <Td align="left" weight="bold">Tổng tạm tính</Td>
              <Td align="center" colSpan="5">115,000</Td>
            </Tr>
            <Tr>
              <Td align="left" weight="bold">Giảm trừ</Td>
              <Td align="center" colSpan="5">115,000</Td>
            </Tr>
            <Tr>
              <Td align="left" bg="rgb(181 210 121)" weight="bold">Thanh toán</Td>
              <Td align="center" colSpan="5" bg="rgb(181 210 121)">115,000</Td>
            </Tr>
          </Table>
        </Block>
      </Block>
      <Block top={40} bottom={20}>
        <Title2>Thông tin nhận hàng</Title2>
        <Block top={20} bottom={20}>
          <Block row>
            <Block width={200}>
              <Title>Họ và tên:</Title>
            </Block>
            <Text>Nguyễn Tùng Lâm</Text>
          </Block>
          <Block row>
            <Block width={200}>
              <Title>Email:</Title>
            </Block>
            <Text>tunglam@gmail.com</Text>
          </Block>
          <Block row>
            <Block width={200}>
              <Title>Điện thoại:</Title>
            </Block>
            <Text>0123456789</Text>
          </Block>
          <Block row>
            <Block width={200}>
              <Title>2020-10-02</Title>
            </Block>
            <Text>9 Đào Duy Anh - Kim Liên - Đống Đa - Hà Nội</Text>
          </Block>
          <Block row>
            <Block width={200}>
              <Title>Tiền mặt/Chuyển khoản</Title>
            </Block>
            <Text>Thông tin đơn hàng của anh như sau</Text>
          </Block>
        </Block>
      </Block>
      <Block top={20} bottom={20} row>
        <Title2>Hình thức thanh toán</Title2>
        <Block left={20} width={200}>
          <Title3>Tiền mặt/Chuyển khoản</Title3>
        </Block>
      </Block>
      <Block top={20} bottom={20} >
        <Title>Bánh cốm Nguyên Hương - Thức quà của người Hà Nội</Title>
        <Text>Địa chỉ: 50 Phố Hàng Than - Nguyễn Trung Trực - Ba Đình - Hà Nội</Text>
        <Text>Điện thoại: 0816 97 99 86 | Email: nguyenhuong50hangthan@gmail.com</Text>
        <Text>Fanpage:   https://www.facebook.com/banhcomnguyenhuong50hangthan</Text>
        <Text>Website: http://banhcomnguyenhuong.com/</Text>
      </Block>
      <Block>
        <Title3>Rất hân hạnh phục vụ quý khách !</Title3>
      </Block>
      <Block style={{ justifyContent: "center" }}>
        <Image src="http://202.92.6.130/logo1.png" width={80} left={10} right={10} />
        <Image src="http://202.92.6.130/logo2.png" />
      </Block>
    </ContainerBorder>
    <Footer>
      <FooterContent>GÌN GIỮ NÉT QUÀ XƯA</FooterContent>
    </Footer>
  </Container>
}