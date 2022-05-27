import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Product from './Product'

function ProductRow() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4
        }
      };

    return (
        
            
                <Carousel 
                responsive={responsive}
                swipeable={true}
                draggable={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={800}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
            
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>

            </Carousel>
        
        
    )
}

export default ProductRow
