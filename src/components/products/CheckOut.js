import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
// import CategorySubmenu from '../sidebar/CategorySubmenu'
// import { size } from "../../data"

function CheckOut({id,data,size}) {

    let dispatch = useDispatch();
    const [tooltip, setTooltip] = React.useState(false);
    const { description} = data;

    // const handleAddToCart = () => {
    //     alert(size)
    // }

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
                size:size
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
            <InnerContainer>
               
                {/* <BottomContainer>
                   <CategorySubmenu
                   title="Size"
                   content={size}
                   isRow={true}
                  />
                  <Text>Shipping <Bold>{shipping}</Bold></Text>
                </BottomContainer> */}
            </InnerContainer>
            <ButtonContainer>
                {/* <ButtonLeft>Add to Wishlist</ButtonLeft> */}
                <Tooltip title={tooltip ? "Added" : "Add to Cart"} >
                    <ButtonRight
                    onClick={handleAddToCart}
                    >Add to Cart</ButtonRight>
                </Tooltip>
            </ButtonContainer>
            <DescriptionContainer>
                {description}
            </DescriptionContainer>
        </Container>
    )
}

export default CheckOut

const Container = styled.div`
    /* padding-top: 1rem; */
    /* width: 400px; */
    /* width: 24rem; */
    
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`

// const BottomContainer = styled.div`

// `

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`

// const ButtonLeft = styled.button`
//     &:hover {
//         cursor: pointer;
//         box-shadow: 0 12px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
//     }
//     padding: 13px 38px;
//     background-color: #727375;
//     color: #ffffff;
//     border-radius:4px;
//     font-size: 16px;
//     font-weight: bold;
//     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
//     /* border: solid 1px #727375; */
//     border: none;
//     @media (max-width: 978px) {
//         padding: 12px 36px;
//         font-size: 0.8rem;
//     }
// `

const ButtonRight = styled.button`
    &:hover {
        cursor: pointer;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    }
    padding: 13px 38px;
    background-color: #0F5435;
    color: #FFFFFF;
    border: none;
    border-radius:4px;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    @media (max-width: 978px) {
        padding: 12px 36px;
        font-size: 0.8rem;
    }
`

const DescriptionContainer = styled.div`
    margin-top: 16px;
    color: #727375;
`

// const Text = styled.p`
//     color: #0F5435;
//     font-weight: 500;
// `

// const Bold = styled.b`
//     text-decoration: underline;
// `
