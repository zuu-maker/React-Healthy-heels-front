import React from 'react'
import styled from 'styled-components'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const options = [
    {
        id:1,
        value:"sold",
        title:"Best Sellers"
    },
    {
        id:2,
        value:"createdAt",
        title:"Just In"
    },
]

function Sidebar({option, setOption}) {

    const handleChange = (e) => {
        const { value } = e.target
        // alert(value)
        setOption(value)
        
    }

    return (
        <Container>
           
             
            <InnerContainer >
            <FormControl color="success" sx={{ m: 1, minWidth: 140 }} size="small">
                <InputLabel >Sort By</InputLabel>
                <Select
                   
                    value={option}
                    label="Sort By"
                    onChange={handleChange}
                >
                    {options.map((opt) => (<MenuItem key={opt.id} value={opt.value}>{opt.title}</MenuItem>))}
                    
                </Select>
                </FormControl>
             
            </InnerContainer>
        </Container>
        
    )
}

export default Sidebar

const Container = styled.div`
    margin-right:1rem;
`





const InnerContainer = styled.div`
        // display: flex;
        // flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        margin-top: 4.2rem; 
        // margin-left: 20px;
        /* @media (max-width: 424px) {
            flex-direction: row;
        } */
`

// const Heading = styled.h1`
//     font-size: 63;
//     /* text-transform:uppercase; */
//     color: #727375;
//     margin-top: 20px;
//     margin-left:16.5px;
// `
