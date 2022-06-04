import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

function InfoContainer({size,setSize,sizes,data}) {

    const [disable, setDisable] = React.useState(false);

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const { title, price, quantity, sold} = data;

    React.useEffect(() => {
        if(quantity - sold === 0){
            setDisable(true)
        }else{
            setDisable(false)
        }
        // eslint-disable-next-line
    },[quantity,sold ])

    return (
        <Container>
                <div
                style={{width: '100%', backgroundColor: 'whitesmoke'}}
                >
                    <Name>{title}</Name>
                </div>
                <Price>K{parseInt(price).toFixed(2)}</Price>
                
                <FormControl disabled={disable} style={{marginTop:"1rem"}} fullWidth>
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
        </Container>
    )
}

export default InfoContainer

const Container = styled.div`
    background-color: #ffffff; 
`

const Name = styled.h2`
    color: #0E5D3B;
    font-weight: 600;
    font-size: 1.8rem;
`

const Price = styled.h3`
    font-style: italic;
    color: #727375;
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 0.5rem;
`


