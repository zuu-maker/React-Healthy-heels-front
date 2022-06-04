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
        setOption(value)  
    }

    return (
        <Container>
           
             
            <InnerContainer >
            <FormControl fullWidth color="success" sx={{ m: 1, minWidth: 140,maxWidth:'400px', }} size="small">
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
        align-items: center;
        margin-top: 4.2rem;
        @media (max-width: 500px) {
            flex-direction: row;
            margin-top: 1.5rem; 
        } 
`
