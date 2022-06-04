import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/header/Header'
import { db } from '../../firebase'
import Payment from './Payment'
import { useSelector} from "react-redux";

function Checkout() {

    let history = useHistory()
    const { user } = useSelector(state => ({...state}));
    const [cart, setCart] = React.useState({})

    const [loading, setLoading] = React.useState(true)
    const [detailedAddress, setDetailedAddress] = React.useState('')
    const [city, setCity] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [phone, setPhone] = React.useState('')

    React.useEffect(() => {
        setLoading(true)
        db.collection("Cart").where("orderedBy", "==",user?.email)
        .get()
        .then((doc) =>{
            if(doc.empty && (doc.docs.length === 0)) history.push("/products")
            setLoading(false)
            setCart(doc?.docs[0]?.data())
        })
        .then(() => {
            console.log(cart.cartTotal);
        })
        .catch(err => {
            console.log(err);
        })
        //eslint-disable-next-line
    },[])

    
    
  return (
    <>
    <Header />
    
    <Container> 
        <InnerContainer>
            {loading ? 
                <h4>Loading...</h4>
            :
            (
                <>
                <LeftContainer>
                <Heading>Delivery Address</Heading>
                <div style={{textAlign: 'center',}} >
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField variant="outlined" onChange={e => setDetailedAddress(e.target.value)} value={detailedAddress} autoFocus color="success" label="Detailed Address" type="text" />
                        <TextField variant="outlined" onChange={e => setCity(e.target.value)} value={city} color="success" label="City" type="text"  />
                        <TextField variant="outlined" onChange={e => setCountry(e.target.value)} value={country} color="success" label="Country" type="text" />
                        <TextField variant="outlined" onChange={e => setPhone(e.target.value)} value={phone} color="success" label="Phone" type="tel" />
                    </Box>
                    <Payment
                     total={cart.cartTotal}
                     city={city}
                     country={country}
                     detailedAddress={detailedAddress}
                     phone={phone}
                    />
                    </div>
                
            </LeftContainer>
            
            <RightContainer >
                <RightInnerContainer >
                <Heading>Order Summary</Heading>
                <ShoeContainer>
                    {cart?.cart?.map((p,i)=>(<Title key={i} >{`${p.title} x ${p.count} = ${(p.price*p.count).toLocaleString('en-us',{
                        style:"currency", currency: "ZMK"
                    })} `}</Title>))}
                    <br/>
                    <hr/>
                    <Title>Total: <b style={{color:"#0e5d3b"}} >{cart.cartTotal?.toLocaleString('en-us',{
                        style:"currency", currency: "ZMK"
                    })}</b> </Title>
                </ShoeContainer>
                    <span style={{fontSize:"12px", fontStyle:"italic", color:"#e86098", fontWeight:"bold"}} >Free Shipping anywhere in Zambia.</span>
                </RightInnerContainer>        
            </RightContainer>
            </>
            )}
           
        </InnerContainer>
        
        
    </Container>
    
  </>
  )
}

export default Checkout

const Container = styled.div`
    margin-top:2rem;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100vh;
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
    @media (max-width: 600px) {
        margin-left:none;
        margin-right:none;
        padding: 0;
        margin-top:5rem;
        height:max-content;
    }
`

const RightInnerContainer = styled.div`
    padding:1rem;
    margin-left:1.5rem;
    box-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    @media (max-width: 600px) {
        margin-left:0;
    }
`

const InnerContainer = styled.div`
    padding: 20px;
    display: flex;
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:3rem;
    @media (max-width: 600px) {
        width:100vw;
        flex-direction: column-reverse;
        padding: 0;
        align-items: center;
        justify-content:center;
        margin-left:0;
        margin-right:0;
    }
`

const LeftContainer = styled.div`
   
    @media (max-width: 600px) {
        display:flex;
        flex-direction: column;
        align-items:center;
    }
   
`  

const RightContainer = styled.div`
     width:24rem;
     flex: 4;
     @media (max-width: 600px) {
        margin-bottom:1rem;
        display:flex;
        align-items:center;
       justify-content:center;
    }
`

const ShoeContainer = styled.div`

`

const Title = styled.h4`
    margin-top:.5rem;
    font-size:1.2rem;
    font-weight:400;
    color:#0e5d3b;
    @media (max-width: 600px) {
        font-size:1rem;
    }
`

const Heading = styled.h2`
    font-size: 1.6rem;
    color: #0e5d3b;
    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`
