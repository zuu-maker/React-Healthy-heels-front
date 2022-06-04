import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';

function CheckOut({id,data,size}) {

    let dispatch = useDispatch();
    const [tooltip, setTooltip] = React.useState("Add to Cart");
    const [disable, setDisable] = React.useState(false);
    const { description,quantity, sold } = data;

    React.useEffect(() => {
        if(quantity - sold === 0){
            setTooltip("Sold Out")
            setDisable(true)
        }else{
            setTooltip("Add to Cart")
            setDisable(false)
        }
         // eslint-disable-next-line
    },[quantity,sold])

    function containsObject(list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return true;
            }
        }
    
        return false;
    }

    const handleAddToCart = () => {
        let cart = [];
        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            if(!containsObject(cart)){
                cart.push({
                    id:id,
                    ...data,
                    count:1,
                    size:""
                });

                localStorage.setItem("cart",JSON.stringify(cart));

            dispatch({
                type:"ADD_TO_CART",
                payload: cart,
            })

            dispatch({
                type:"SET_DRAWER",
                payload:true
              })
            setTooltip("Added");

            }
        }
        setTooltip("Added");
    };

    return (
        <Container>
            <InnerContainer>
            </InnerContainer>
            <ButtonContainer>
                <Tooltip title={tooltip} >
                   {disable ?(
                       <ButtonRightDisable
                       >Sold Out</ButtonRightDisable>
                   ):(
                        <ButtonRight
                        onClick={handleAddToCart}
                        >Add to Cart</ButtonRight>
                   )} 
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
    
`
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`

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

const ButtonRightDisable = styled.button`
    &:hover {
        cursor: pointer;
    }
    padding: 13px 38px;
    background-color: grey;
    color: #FFFFFF;
    border: none;
    border-radius:4px;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2), 0 2px 5px 0 rgba(0,0,0,0.19);
    @media (max-width: 978px) {
        padding: 12px 36px;
        font-size: 0.8rem;
    }  
`

const DescriptionContainer = styled.div`
    margin-top: 16px;
    color: #727375;
`