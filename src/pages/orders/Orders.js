import React from 'react'
import Header from '../../components/header/Header'
import styled from 'styled-components'

import {useSelector} from 'react-redux'
import { db } from '../../firebase'
import Order from '../../components/orders/Order'
import { Link } from 'react-router-dom'

function Orders() {

    let { user} = useSelector((state) =>({...state}));

    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {
        if(user && user.token){
            db.collection("Order").where("orderedBy","==",user.email)
            .onSnapshot((snap) => {
                setOrders(snap.docs.map(doc => ({id:doc.id, data:doc.data()})))
            })            
        }
        //eslint-disable-next-line
    },[user])

  return (
    <div style={{height:"100%"}}>
    <Header />
        <Container>
            <InnerContainer>
                <div>
                <Title> Your Orders </Title>
                </div>
                {orders && orders.length > 0 ? orders.map((order) => <Order key={order.id} id={order.id} order={order.data} />): <LinkBack>No orders yet, buy and it will show here  <Link to="/products">Continue Shopping?</Link> </LinkBack>}
            </InnerContainer>  
        </Container>
    </div>
  )
}

export default Orders

const InnerContainer = styled.div`
    // background-color:red;

    width:80%;
    height:100%;
`

const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width: 1366px;
    // min-height: 68vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 88px;
    @media (max-width: 424px) {
        // flex-direction: column;
        /* height: 66%;
        margin-bottom:-8rem ;
        margin-top:2rem ; */
    }
`

const LinkBack = styled.h4`
    text-align: center;
    margin:auto;
`

const Title = styled.h2`
    margin-right: 15px;
    border-bottom: 1px solid lightgray;
    padding: 20px;
    color: #0e5d3b  !important;
    font-weight: 900 !important;
`
                   
         
                       
                 