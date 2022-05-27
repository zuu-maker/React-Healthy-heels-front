import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

function InfoContainer({size,setSize,sizes,data}) {

    // const [size, setSize] = React.useState('');

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const { title, price} = data;

    return (
        <Container>
            {/* <InnerContainer> */}
                <div
                style={{width: '100%', backgroundColor: 'whitesmoke'}}
                >
                    <Name>{title}</Name>
                </div>
                <Price>K{parseInt(price).toFixed(2)}</Price>
                
                <FormControl style={{marginTop:"1rem"}} fullWidth>
                    <InputLabel
                    color="success"
                    >Size</InputLabel>
                    <Select
                    value={size}
                    color="success"
                    label="Size"
                    onChange={handleChange}
                    >
                        
                        {
                        //eslint-disable-next-line
                        sizes.length > 0 && sizes.map((item) => {
                            if(item.data.quan - item.data.sold > 0){
                                return <MenuItem key={item.data.size} value={item.data.size}>{item.data.size}</MenuItem>
                            }
                        }) }
                   
                    </Select>
                </FormControl>
            {/* </InnerContainer> */}
        </Container>
    )
}

export default InfoContainer

const Container = styled.div`
    /* box-shadow: 1.5px 1.5px 14px 0 rgba(0,0,0,.2); */
    /* margin-top: 132px; */
    /* height: 10rem; */
    
    /* width: 15rem; */
    background-color: #ffffff;
    
    
`

// const InnerContainer = styled.div`
 /* margin-top: 28px; */
 /* margin-left: 16px; */
 /* margin-bottom: 28px; */
// `

const Name = styled.h2`
    color: #0E5D3B;
    /* color: #727375; */
    font-weight: 600;
    font-size: 1.8rem;
    /* font-family: 'Urbanist', sans-serif; */
`

const Price = styled.h3`
    font-style: italic;
    /* color: #0E5D3B; */
    color: #727375;
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 0.5rem;
`

// const Color = styled.div`
//     margin-top: 0.5rem;
// `


