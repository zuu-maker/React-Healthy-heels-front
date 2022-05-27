import React from 'react'
import styled, { keyframes } from 'styled-components'
import Product from './Product'

function Row({title,products}) {
    return (
        <Container>
            <Heading>{title}</Heading>
            <InnerContainer>
              {products.map(product => <Product key={product.id} id={product.id} data={product.data}/>)}
                    {/* {JSON.stringify(products)}
                    <Product/>
                    <Product/>
                    {isHome && <Product/> }   */}
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 100%; 
     /* margin-top: 36px; */
     /* margin-left: 100px; */
     /* margin-right: 100px; */
     /* max-width: 1366px; */
`

const InnerContainer = styled.div`
    /* text-align :center ; */
   display: flex;
   justify-content:center;
   align-items:center;
    /* align-items: center;
    justify-content: center; */
    /* max-width: 1366px; */
    /* width: 100%; */
    margin-top: 16px;
    @media (max-width: 424px) {
        flex-direction: column;
    }
    /* height: 100vh; */
    /* margin-bottom: 0px; */
    /* padding-left: 50px; */
    /* padding: 40px; */
`

const myAnim = keyframes`
  0% {
    animation-timing-function: ease-out;
    transform: scale(1);
    transform-origin: center center;
  }

  10% {
    animation-timing-function: ease-in;
    transform: scale(0.91);
  }

  17% {
    animation-timing-function: ease-out;
    transform: scale(0.98);
  }

  33% {
    animation-timing-function: ease-in;
    transform: scale(0.87);
  }

  45% {
    animation-timing-function: ease-out;
    transform: scale(1);
  }

`

const Heading = styled.h6`
    font-size: 2.2rem;
    text-transform:uppercase;
    color: #727375;
    animation: ${myAnim} 2s linear 0s infinite normal none;
    overflow-x:hidden;
`



export default Row
