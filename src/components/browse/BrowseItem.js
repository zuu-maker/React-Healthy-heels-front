import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function BrowseItem({title,image}) {
    return (
        <Container>
            <Image src={image} alt=""/>
            <Info>
                <Title>{title}</Title>
                <Link style={{textDecoration:"none"}} to="/products">
                    <Button
                    >Shop Now</Button>
                </Link>
            </Info>
        </Container>
    )
}

const Container = styled.div`
flex: 1;
height: 54vh !important;
margin: 12px;
position: relative
/* @media (max-width: 424px) {
    height: 26vh !important;

    } */
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`

const Button = styled.button`
border: none;
padding: 10px;
background-color:white;
color: grey;
cursor: pointer;
font-weight: 600;
`

export default BrowseItem
