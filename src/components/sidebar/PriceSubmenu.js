import React,{useState} from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useDispatch} from 'react-redux'

function PriceSubmenu({price, setPrice, ok, setOk}) {

    const [show,setShow] = useState(true)
    let dispatch = useDispatch()

    const handlePrice = (event, newValue) => {
        dispatch({
            type:"SEARCH_QUERY",
            payload:{ text:"" }
        })
        setPrice(newValue);
        setTimeout(() => {
            setOk(!ok)
        },400)
      };

    return (
        <Container>
            
                    <InnerContainer  >
                    
                    
                    {show ? <ArrowDropDownIcon fontSize="large" onClick={() => setShow(!show)}/>: <ArrowRightIcon fontSize="large" onClick={() => setShow(!show)}/>}
                    
                    <IconContainer>
                        <AttachMoneyIcon fontSize="small" />  <Text>Price</Text>
                    </IconContainer>
                    
                    </InnerContainer>
                       {show && 
                            <Box sx={{width:'100%'}}>
                            <Slider
                                // size="small"
                                value={price}
                                min={50} 
                                max={5000} 
                                valueLabelDisplay="on"
                                color="success"
                                onChange={handlePrice}
                            />
                            </Box>
                       } 
        
           
        </Container>
    )
}

export default PriceSubmenu

const Container = styled.div`
width: 100%;
margin-top: 24px;
@media (max-width: 424px) {
  /* padding-left: 0.5rem; */
}
/* margin-left: 16px; */
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */
`

const IconContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

const InnerContainer = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    &:hover {
        color:#90ee90;
        transition: all 0.3s 0.2s ease-in-out;
    }
`

const Text = styled.p`
    font-weight: 400;
    font-size:1.2rem;
`

// const TitleContainer = styled.div`
//     display: flex;
//     justify-content:space-between;
// `

/* const Wrapper = styled.div`
    margin-top: 18px;
` */
