import React from "react";
import styled from "styled-components";
import Info from "./Info";
import "../../App.css";

import { useHistory } from "react-router-dom";

function Product({ id, data }) {
  const { images, slug } = data;
  const history = useHistory();

  return (
    <Container>
      <InnerContainer onClick={() => history.push("/product/" + slug)}>
        <Image src={images[0]?.url} />
      </InnerContainer>
      <Info id={id} data={data} />
    </Container>
  );
}

export default Product;

const Container = styled.div`
  &:hover {
    transform: scale(1.08);
    transition: all 0.7s 0.2s ease-in-out;
  }
  width: 272px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  @media (max-width: 915px) {
    width: 202px;
  }
  @media (max-width: 1340px) {
    width: 246px;
  }
  @media (min-width: 600px) {
    &:hover {
      transform: scale(1.08);
      transition: all 0.7s 0.2s ease-in-out;
    }
  }
`;

const InnerContainer = styled.div`
  height: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  cursor: pointer;
  object-fit: cover;
  @media (max-width: 915px) {
    height: 260px;
  }
`;
