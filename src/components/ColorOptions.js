import React from 'react'
import styled from 'styled-components'

function ColorOptions() {
    return (
        <Container>
            <Round />
            <Round />
            <Round />
        </Container>
    )
}

export default ColorOptions

const Round = styled.div`
    /* box-shadow: 4px 4px 40px 6px rgba(0,0,0,.2); */
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: all 0.14s 0.2s ease-in-out;
    }
    margin-top:0.6rem;
    box-shadow: 2px 2px 14px 0px rgba(70,70,70,0.61);
    border-radius:50%;
    width:1.8rem;
    height:1.8rem;
    background-color:brown;
    margin-left: 0.8rem;
`

const Container = styled.div`
    display: flex;
    align-items: center
`


