import React from 'react';
import styled from 'styled-components'
import Info from './Info'
import "../../App.css"

import { useHistory } from "react-router-dom";

function Product({id,data}) {

    const {images, slug} = data;
    let history = useHistory();
    // const [color,setColor] = useState(false);

    return (
    <Container >
        {/* {JSON.stringify(data)} */}
        <InnerContainer>
            <Image src={images[0].url} onClick={() => history.push("/product/"+slug)} />
            {/* <Icon onClick={() => setColor(color)}>
               <FavoriteIcon className={color ? "heartColorPress" : "heartColor" }  />
            </Icon> */}
        </InnerContainer>
        <Info 
            id={id}
            data={data}
        />
    </Container>
    )
}

export default Product

const Container = styled.div`
    /* border: 0.5px solid lightgray; */
    /* max-width:200px; */
    /* border-radius: 5px ; */
    &:hover {
        transform: scale(1.08);
        transition: all 0.7s 0.2s ease-in-out;
    }
    width: 272px;
    box-shadow: 0px 4px 4px 0 rgba(0,0,0,.4);
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    @media (max-width: 915px) {
        width: 202px;
       
    }
    @media (max-width: 1340px) {
        width: 246px;
       
    }
    @media (max-width: 600px) {
        width: 84%;
    }
    @media (min-width: 425px) {
        &:hover {
            transform: scale(1.08);
            transition: all 0.7s 0.2s ease-in-out;
        }
    }
    /* height:300px ; */
`

// const Info = styled.div`

// `

const InnerContainer = styled.div`

    height: 100%;
    position: relative;
`

// const Icon = styled.div`
//     top: 6px;
//     right: 8px;
//     position: absolute;
// `



const Image = styled.img`
    width: 100%;
    
    height: 280px;
    /* border-radius: 5px 5px 0 0; */
    cursor: pointer;
    object-fit:cover;
`


