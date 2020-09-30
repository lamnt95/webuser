import _ from "lodash"
import React from "react"
import styled from "styled-components"

const Error = styled.div`
  color: red;
  font-size: 13px;
  padding-left: 230px;
`;

export default function ErrorText({ errors }) {
  return errors &&
    _.map(errors, (error) => error ? <Error>{error}</Error> : null)
}