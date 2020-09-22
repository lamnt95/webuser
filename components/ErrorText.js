import _ from "lodash"
import React from "react"
import styled from "styled-components"

const Error = styled.div`
  color: red;
  font-size: 13px;
  text-align:center;
`;

export default function ErrorText({ errors }) {
  return errors &&
    _.map(errors, (error) => <Error>{error}</Error>)
}