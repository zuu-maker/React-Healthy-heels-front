import React from 'react'
import styled from 'styled-components'

function Announcement() {
    return (
        <Container>
            Dont Miss Out!!! Buy 1 Get 1 Free.
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    height: 28px;
    background-color:#f5998e;
    position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:1000;
`


export default Announcement
