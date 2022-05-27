import React from 'react'
import styled from 'styled-components'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';

function Info({id,data}) {

    const {title, sold, quantity, price} = data;
    const inStock = quantity - sold;
    let dispatch = useDispatch();
    const [tooltip, setTooltip] = React.useState(false);

    const handleAddToCart = () => {
        let cart = [];
        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.push({
                id:id,
                ...data,
                count:1,
                size:""
            });

            let unique = _.uniqWith(cart,_.isEqual);

            localStorage.setItem("cart",JSON.stringify(unique));

            dispatch({
                type:"ADD_TO_CART",
                payload: unique,
            })

            dispatch({
                type:"SET_DRAWER",
                payload:true
              })
            setTooltip(true);
        }
    };

    return (
        <Container>
            <Center>
                <Title>{title}</Title>
                <Tooltip title={tooltip ? "Added" : "Add to Cart"} >
                <AddShoppingCartIcon onClick={handleAddToCart} style={{color: "#727375", cursor: "pointer"}} />
                </Tooltip>
            </Center>
            <InnerContainer>
                <Price>
                    k{parseInt(price).toFixed(2)}
                </Price>
                
                {sold === quantity ? <Stock>Sold Out</Stock> : <Stock>{inStock+" In Stock"}</Stock>} 
                
            </InnerContainer>
            {/* <ButtonContainer>
            <Button style={{backgroundColor:"#E7E6E6", color:"#727375"}} variant="conatained">Add To Cart</Button>
            <Button style={{backgroundColor:"#727375"}} variant="contained">Buy Now</Button>
            </ButtonContainer> */}
        </Container>
    )
}

export default Info

const Container = styled.div`
    
    width:96%;
    
    padding: 8px;
`

const Center = styled.div`
display: flex;
justify-content:space-between;
margin-top:0.4rem;
margin-bottom:0.4rem;
`

const Title = styled.h3`
    font-size: 16px;
    color: #727375;
`

const Price = styled.p`

    font-size:1.25rem;
    font-weight: bold;
    color: #0e5d3b;
`

const Stock = styled.h3`
    font-size: 1rem;
    color: #0e5d3b;
`

const InnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
` 


