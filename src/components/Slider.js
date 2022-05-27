import React, {useState} from 'react'
import styled from 'styled-components'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {slides} from "../data"
import { useHistory } from 'react-router-dom';

function Slider() {

    const [slideIndex, setSlideIndex] = useState(0)
    let history = useHistory();
    
    const handleClick = (direction) => {
        
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideIndex)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1: slideIndex)
        }
    }

    return (
        <Container>
            <Arrow pointer="left"   onClick={() => handleClick("left")}>
                <KeyboardArrowLeftIcon disable={slideIndex === 0} fontSize="large"/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {slides.map((item,i) => 
                    <Slide key={i} bg={item.bg}>
                    <ImageContainer>
                        <Image src={item.image} alt="" />
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Description>{item.desc}</Description>
                        <Button onClick={() => history.push("/products")}>Shop Now</Button>
                    </InfoContainer>
                    </Slide>   
                )}             
            </Wrapper>
            <Arrow pointer="right"  disabled={slideIndex === 2} onClick={() => handleClick("right")} >
                <KeyboardArrowRightIcon fontSize="large"/>
            </Arrow>      
        </Container>
    )
}

const Container = styled.div`
/* max-width: 1366px; */
    width: 100%;
    height: 92vh;
    display: flex;
    position: relative;
    overflow: hidden;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;
    /* padding: 5px; */
    opacity: 0.68;
    background-color:#ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    top: 0;
    bottom: 0;
    z-index:5;
    margin: auto;
    left: ${props => props.pointer === "left" && "10px"};
    right: ${props => props.pointer === "right" && "10px"};
`

const Wrapper = styled.div`
display: flex;
height: 100%;
/* @media (min-width: 1365px) {
    transform: translateX(${props => props.slideIndex * -1366}px);
  } */
transform: translateX(${props => props.slideIndex * -100}vw);
transition: all 1800ms ease;
`

const Slide = styled.div`
max-width: 1366px;
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color:${props => props.bg};
@media (max-width: 424px) {
        flex-direction: column;
    }
`

const ImageContainer = styled.div`
height: 100%;
flex: 1;
@media (max-width: 424px) {
        flex-direction: column;
        height: 66%;
        margin-bottom:-8rem ;
        margin-top:2rem ;
    }
`

const InfoContainer = styled.div`
flex: 1;
padding: 2rem 2rem 4rem;
margin-bottom:3rem;
`

const Image = styled.img`
margin-left: 0.25rem;
height: 100%;
`

const Title = styled.h1`
font: 68px;
`
const Description = styled.p`
margin:20px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
`
const Button = styled.button`
&:hover {
    background-color:#a7a7a7;
}
 padding: 12px;
 font-size: 20px;
 border-radius: 20px;
 background-color:transparent;
 cursor: pointer;
`

export default Slider
