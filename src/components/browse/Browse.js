import React from 'react'
import styled from 'styled-components'
import BrowseItem from './BrowseItem'
import { browse } from "../../data"

function Browse() {

    return (
        <Container>
            {browse.map(item =>
              <BrowseItem
              key={item.id}
              image={item.image}
              title={item.title}
              />)
            }
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
@media (max-width: 600px) {
        flex-direction: column;
    }
`

export default Browse
