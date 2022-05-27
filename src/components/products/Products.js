import React from 'react'
import styled from 'styled-components'
import Row from './Row';

function Products() {
    return (
        <Container>
            <Row 
            isHome={true}
            title="just in"
            />
            <Row 
            isHome={true}
            title="top picks"
            />
        </Container>
    )
}

const Container = styled.div`
    /* max-width: 1366px; */
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`

export default Products
