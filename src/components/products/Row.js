import React from 'react'
import styled, { keyframes } from 'styled-components'
import Product from './Product'

function Row({id,title,products}) {

  const [newProducts, setNewProducts] = React.useState()

  React.useEffect(() => {
    const result = products.filter(product => product.id !== id);
    setNewProducts(result)
  },[products, id])

    return (
        <Container>
            <Heading>{title}</Heading>
            <InnerContainer>
            
              {newProducts?.map(product => <Product key={product.id} id={product.id} data={product.data}/>)}
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
`

const InnerContainer = styled.div`
   display: flex;
   justify-content:center;
   align-items:center;
    margin-top: 16px;
    @media (max-width: 424px) {
        flex-direction: column;
    }
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
    @media (max-width: 600px) {
      font-size: 1.4rem;
  }
`

export default Row
