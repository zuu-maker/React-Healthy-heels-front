import React from 'react';
import styled from 'styled-components'
import Header from '../components/header/Header';
import {useSelector} from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { Alert, Button, Snackbar } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductCardCheckout from '../components/ProductCardCheckout';
import { db } from '../firebase';
import { addCart } from '../functions/cart';
import { useDispatch } from 'react-redux';

function Cart() {
    const {user,cart} = useSelector((state) => ({...state}));
    let dispatch = useDispatch();
    let history = useHistory();
    const [show, setShow] = React.useState(false)
    const [disable, setDisable] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [name, setName] = React.useState("")

    React.useEffect(() => {
        if(!cart.every(p => p.size)){
            setDisable(true)
        }else{
            setDisable(false)
        }
    },[cart])

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const saveOrder = () => {
            if(disable){
                setMessage("Please select sizes on all products!")
                setShow(true)
                return
            } 

        if(!disable){
            db.collection("Cart").where("orderedBy","==", user.email)
            .get()
            .then(doc => {
                if(!doc.empty){
                    db.collection("Cart").doc(doc.docs[0].id).delete()
                }

                let newCart = [];
                let total = 0;
                //eslint-disable-next-line
                cart.map((item) => {
                
                    db.collection("Product").doc(item.id)
                    .get()
                    .then(doc => {
                        if(doc.data().quantity - doc.data().sold === 0){
                            setName(doc.data().title)
                            setMessage(name+ "is sold out, please remove from cart!")
                            setShow(true)
                            return
                        }

                        if(doc.exists){
                            item.price = doc.data().price
                            total = total + doc.data().price
                        }
                        
                        newCart.push(item)
                        if(newCart.length === cart.length){
                            dispatch({
                                    type:"ADD_TO_CART",
                                    payload: newCart,
                                })
                            addCart(cart, user?.email,getTotal())
                            .then(res => {
                                res.update({cartId: res.id})
                                history.push("/checkout")
                            })
                            .catch((err) => {
                                alert("failed")
                                console.log(err)
                            })
                            
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
        
                
                    
                })
            })
        }
        
             
    }

    const handleClose = () => {
        setShow(false)
        setName("")
    }

    const showCartItems = () => (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Size</TableCell> 
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Shipping</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
            {cart.map((p, i) => (
                <ProductCardCheckout key={i} p={p}/>
            ))}
      </Table>
    </TableContainer>
    )

  return(
      <>
        <Header />
        <Container> 
                <Snackbar
                anchorOrigin={{ vertical:"top", horizontal :"right" }}
                open={show}
                onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                    </Alert>
                </Snackbar>
            <LeftContainer>
            
            <div>
            <Title>Your Shopping Cart</Title>
            </div>
           {!cart?.length ? (
               <LinkBack>No Products in cart <Link to="/products">Continue Shopping</Link> </LinkBack>
           ):(
              showCartItems()
           )}
            </LeftContainer>
            
            <RightContainer >
                <div>
                <Title>Purchase Summary</Title>
                </div>
                    <TotalContainer>
                        {cart.map((c,i) => 
                            <ListItem key={i}>
                                <p>{c.title} x {c.count} = {"K" + c.price * c.count}</p>  
                            </ListItem>
                        )}
                        <br />
                        <Total>Total: K{parseInt(getTotal()).toFixed(2)}</Total>
                        <br/>
                        {user ? (
                            <Button 
                            variant="contained"
                            color="success"
                            disabled={!cart.length}
                            onClick={saveOrder} 
                            >
                                Proceed to Checkout
                            </Button>
                        ): (
                            <Button 
                            variant="contained"
                            color="success"

                            >
                                <Link
                                style={{color:"white",textDecoration: "none"}}
                                to={{
                                    pathname:"/login",
                                    state:{ from:"cart" }
                                }}
                                >
                                    Login to Checkout
                                </Link>
                            </Button>
                        )}
                    </TotalContainer>
                    
            </RightContainer>
        </Container>
      </>  
  ) 
}

export default Cart;

const Container = styled.div`
    margin-top:4rem;
    padding: 20px;
    display: flex;
    background-color: #F5F5F5;
    min-height:100vh;
    @media (max-width: 424px) {
        flex-direction: column;
    }
`

const TotalContainer = styled.div`
    margin-top:1rem;
    margin-left:1rem;
    background-color:white;
    padding:2rem;
    border: 1px solid white;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
`

const Total = styled.h2`
    font-weight:400;
`

const LinkBack = styled.h4`
    text-align: center;
    margin:auto;
`

const ListItem = styled.div`
    margin-top:0.5rem;
`

const LeftContainer = styled.div`
    width: 100%;
    height: 100%;
    flex: 7.5;
    @media (max-width: 424px) {
        flex: 0;
    }
`

const RightContainer = styled.div`
     flex: 2.5;
     text-align: center;
`

const Title = styled.h2`
    margin-right: 15px;
    border-bottom: 1px solid lightgray;
    padding: 20px;
    color: #0e5d3b  !important;
    font-weight: 900 !important;
`