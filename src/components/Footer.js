import React from 'react'
import styled from 'styled-components'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import "../App.css"

function Footer() {
    return (
        <Container>
            <InnerContainer>
                <div>
                    <Image src="/images/logo.png" alt="" />
                </div>
                <div>
                    <p style={{fontSize:'0.8rem'}}>© 2021 healthyheels.com. All rights reserved.</p>
                </div>
                <SocialIcons
                >
                    <InstagramIcon  className="instagramColor"  />
                    <WhatsAppIcon  className="whatsappColor"  />
                    <FacebookIcon  className="facebookColor"  />
                </SocialIcons>
            </InnerContainer>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    background-color:#e4e8e9;
    padding-top:1rem;
    /* display: flex;
    align-items: center; */
    /* justify-content: space-between; */
    /* position: absolute;
    bottom: 0; */
    margin-top:4rem ;
`

const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left:4rem;
    margin-right:4rem;
`

const Image = styled.img`
    height: 3.825rem;
    cursor: pointer;
    object-fit:contain;
    @media (max-width: 424px) {
        height: 3rem;
    }
`

const SocialIcons = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
`
