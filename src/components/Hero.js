import React from 'react'
import styled from 'styled-components'
import Carousel from "react-multi-carousel";

function Hero() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <Container>
            <Carousel 
            responsive={responsive}
            swipeable={true}
            draggable={false}
            showDots={true}
            infinite={true}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={800}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={true}
            >
              
                <Heromm>
                  <Trans/>  
                </Heromm>
                <Herom>
                  <Trans/>  
                </Herom>
                <Heromm>
                  <Trans/>  
                </Heromm>
                <Herom>
                  <Trans/>  
                </Herom>
            </Carousel>
        </Container>
    )
}

const Container = styled.div`
    max-width: 1366px;
    width: 100vw;
`

const Heromm = styled.div`
    margin: 0 36px;
    max-width: 1366px;
    height: 80vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    max-width: 1366px;
    background-image: url(/images/hero.jpg);
`

const Herom = styled.div`
    margin: 0 36px;
    max-width: 1366px;
    height: 80vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    max-width: 1366px;
    background-image: url(/images/men.jpg);
`

const Trans = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1;
    opacity: 0.4;
`

export default Hero
