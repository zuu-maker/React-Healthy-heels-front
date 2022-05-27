import React from 'react'
import styled from 'styled-components'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js"
import StripeCheckout from '../../components/payment/StripeCheckout';
import { useSelector} from "react-redux";
import { db } from '../../firebase';

const promise = loadStripe('pk_test_51KWLtSD51CRpm9mgqWXe47VsDiIkT0gH3rnHkMZEky8T9ptlg4CquFQwQGGKOvQ4p2ctJpaaoIiQZBCLk9K6AS7600zsZdkymG');

const style = {
    width: '100%',
}

function Payment({city, country, detailedAddress, phone}) {

  const { user } = useSelector(state => ({...state}));

  const saveAddress = () => {

    if(!city || !country || !detailedAddress || !phone){
      return false
    }
  
    db.collection("Users").doc(user.id).update({
      address:{
        city,
        country,
        detailedAddress,
      },
      phone: phone,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err)
      alert("failed to save address") 
    })
    return true
    
  }

  return (
    <Container>
      <Heading2>Complete Payment</Heading2>
      <Elements stripe={promise}>
          <div style={style}>
             <StripeCheckout
              saveAddress={saveAddress}
             />
          </div>
      </Elements>
    </Container>
  )
}

export default Payment

const Container = styled.div`
    margin-top:1.8rem;
    /* padding: 20px; */
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    /* background-Color:#F0EAD6; */
    /* height: max-content; */
    /* min-height:100vh; */
    width: 100%;
    /* display: flex; */
    justify-content: center;
    
    
`

const Heading2 = styled.h3`
    font-size: 1.4rem;
    margin-bottom:.8rem;
    /* text-transform:uppercase; */
    color: #0e5d3b;
    /* margin-top: 20px; */
    /* margin-left:16.5px; */
`