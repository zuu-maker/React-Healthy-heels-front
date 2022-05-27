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
                    </div>
                    <Payment
                     city={city}
                     country={country}
                     detailedAddress={detailedAddress}
                     phone={phone}
                    />
               
                
            </LeftContainer>
            
            <RightContainer >
                <div style={{padding:"1rem",marginLeft:'1.5rem', boxShadow:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"}}>
                <Heading>Order Summary</Heading>
                <ShoeContainer>
                    {cart?.cart?.map((p) =>(<Title>{`${p.title} x ${p.count} = ${(p.price*p.count).toLocaleString('en-us',{
                        style:"currency", currency: "ZMK"
                    })} `}</Title>))}
                    <br/>
                    <hr/>
                    <Title>Total: <b style={{color:"#0e5d3b"}} >{cart.cartTotal?.toLocaleString('en-us',{
                        style:"currency", currency: "ZMK"
                    })}</b> </Title>
                </ShoeContainer>
                    <span style={{fontSize:"12px", fontStyle:"italic", color:"#e86098", fontWeight:"bold"}} >Free Shipping anywhere in Zambia.</span>
                </div>        
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
    margin-top:1.2rem;
    padding: 20px;
    display: flex;
    flex-direction: column;
    /* height: max-content; */
    align-items: center;
    justify-content: center;
    height:100vh;
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
`

const InnerContainer = styled.div`
    padding: 20px;
    display: flex;
    /* background-Color:#F0EAD6; */
    /* height: max-content; */
    /* min-height:100vh; */
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:3rem;
`

// const ButtonContainer = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-top:.5rem;
// `

const LeftContainer = styled.div`
    width: 100%;
    /* text-align: center; */
    /* height: 100%; */
    flex: 6;
    
`  

const RightContainer = styled.div`
     
     flex: 4;
     
     /* text-align: center; */
`

const ShoeContainer = styled.div`

`

const Title = styled.h4`
    margin-top:.5rem;
    font-size:1.2rem;
    font-weight:400;
    color:#0e5d3b;
`

const Heading = styled.h2`
    font-size: 1.6rem;
    /* text-transform:uppercase; */
    color: #0e5d3b;
    /* margin-top: 20px; */
    /* margin-left:16.5px; */
`

// const TotalContainer = styled.div`
//     margin-top:1rem;
//     margin-left:1rem;
//     background-color:white;
//     padding:2rem;
//     border: 1px solid white;
//     box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
// `