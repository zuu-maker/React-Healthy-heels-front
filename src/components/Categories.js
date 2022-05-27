import React from 'react'
import styled from 'styled-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory } from "react-router-dom";

function Categories() {

    let history = useHistory();

    return (
        <Container>
            {/* <Heading>Category</Heading> */}
            <InnerContainer>
                <CategoryLeft onClick={() => history.push("/products")}>
                    <Trans/>
                    <LinkContainer>
                        <LinkItem>Shop Women's Shoes</LinkItem>
                        <ArrowUpwardIcon className="arrowLeft"/>
                    </LinkContainer>
                    
                </CategoryLeft>
                <CategoryRight onClick={() => history.push("/products")}>
                    <Trans/>
                    <LinkContainer>
                        <LinkItem>Shop Men's Shoes</LinkItem>
                        <ArrowUpwardIcon className="arrowRight"/>
                    </LinkContainer>
                </CategoryRight>
            </InnerContainer>
            {/* <Button>Shop Now</Button> */}
        </Container>
    )
}

// const StyledButton = styled(Button)`
//   background-color: red;
//   border-radius: 0;
// `

const Container = styled.div`
     display: flex;
     
     justify-content: center;
     /* align-items: center;  */
     width: 100%;
     margin-top: 1rem;
     /* width: 24rem; */
     @media (max-width: 424px) {
        /* margin-right: auto;
        margin-left: auto; */
        
        width: 100%;
    }
     /* margin-left: 100px;
     margin-right: 100px; */
     /* max-width: 1366px; */
`



const InnerContainer = styled.div`
    display: flex;
    /* justify-content: space-between; */
    margin-top: 16px;
    @media (max-width: 424px) {
        flex-direction: column;
    }
`

const CategoryLeft = styled.div`
    &:hover {
        cursor: pointer;
    }
    background-image: url(/images/men.jpg);
    width: 440px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
    margin-top: 24px;
    margin-left:10px;
    margin-right:10px;
    position: relative;
    box-shadow: 10px 10px 20px 0 rgba(0,0,0,.3);
    @media (max-width: 424px) {
        width: 22rem;
    }
`

const CategoryRight = styled.div`
    &:hover {
        cursor: pointer;
    }
    background-image: url(/images/men.jpg);
    width: 440px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
    margin-left:10px;
    margin-right:10px;
    position: relative;
    box-shadow: 10px 10px 20px 0 rgba(0,0,0,.3);
    @media (max-width: 424px) {
        width: 22rem;
        margin-top:2rem;
    }
`

const Trans = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1;
    opacity: 0.28;
`

const LinkItem = styled.p`
    z-index: 100;
    position: absolute;
    bottom: 4px;
    left: 4px;
    color: white;
    font-weight: 600;
    margin-right:12px !important;
    
`

const LinkContainer = styled.div`
    cursor: pointer;
    &:hover ${LinkItem}  {
        text-decoration: underline;
    }
    
    /* text-decoration: underline; */
    /* display:flex;
    justify-content:space-between; */
`


export default Categories
