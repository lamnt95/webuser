import _ from "lodash"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ece9c4;
  display:flex;
  justify-content:space-between;
  padding-left:80px;
  padding-right:80px;
  padding-top:50px;
  padding-bottom:50px;
`;

const TextWrapper = styled.div`
  display:flex;
  justify-content:center;
`

const Text = styled.div`
  font-family: 'Taviraj', serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.33;
  text-align: center;
  color: #7E2024;
`

export default function Intro({intro=""}) {
  if(_.isEmpty(intro)) return null;
  return <Container id="intro">
    <TextWrapper>
      <Text>
        {intro}
    </Text>
    </TextWrapper>
  </Container>
}