import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch} from "react-redux";
import firebase from "firebase"
import { db } from "../../firebase"
import axios from "axios";
import "./payment.css"
import { useHistory } from "react-router-dom";

function StripeCheckout({total,saveAddress}) {

    let dispatch = useDispatch()
    const { user } = useSelector(state => ({...state}));

    let history = useHistory()
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState("")

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
         // Create PaymentIntent as soon as the page loads
         if(total){
            axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,{
              total
            })
            .then((res) => {
                setClientSecret(res.data.clientSecret)
                
            })
            .catch((err) => {
              console.log(err);
            })
         }      
    },[total])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setProcessing(true)

        if(!saveAddress()){
          setProcessing(false)
          alert("Input all Address Information")
          return;
        } 
        
    
        const payload = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card: elements.getElement(CardElement),
            billing_details:{
              name:e.target.name.value,
            }
          }
        })
    
        if(payload.error){
          setError(`Payment Failed ${payload.error.message}`)
            setProcessing(false)
          }else{
            db.collection("Cart").where("orderedBy","==", user.email)
            .get()
            .then((querySnapshot) => {

              // eslint-disable-next-line
              querySnapshot.docs[0].data().cart.map(item => {
                db.collection('Product').doc(item.id).update({sold: firebase.firestore.FieldValue.increment(item.count)})
                db.collection('Product').doc(item.id).collection('sizes')
                .where("size","==",item.size)
                .get()
                .then(doc => {
                    // eslint-disable-next-line
                    
                    
                    db.collection('Product').doc(item.id).collection('sizes').doc(doc.docs[0].id).update({sold: firebase.firestore.FieldValue.increment(parseInt(item.count))})
            
                })
              })

                  db.collection("Users").doc(user.id).collection("Orders").add({
                    products:querySnapshot.docs[0].data().cart,
                    paymentIntent:payload.paymentIntent,
                    orderStatus: "Not Processed",
                    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdatedAt:firebase.firestore.FieldValue.serverTimestamp()
                  }).then((res) => {
                    // res.update({customerOrderId:})
                    db.collection("Order").add({
                    customerOrderId:res.id,
                    products:querySnapshot.docs[0].data().cart,
                    paymentIntent:payload.paymentIntent,
                    orderStatus: "Not Processed",
                    orderedBy:user.id,
                    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdatedAt:firebase.firestore.FieldValue.serverTimestamp()
                    })
                    if(typeof window !== "undefined") localStorage.removeItem("cart")
                    dispatch({
                      type:"ADD_TO_CART",
                      payload:[]
                    })
                    db.collection("Cart").doc(querySnapshot.docs[0].id).delete()
                    history.replace("/user/history")
                    // alert("success")
                  }).catch(err => {
                    alert("error")
                    console.log(err);
                  })
                })
              
            .catch(err => {
              alert("payment Err")
            })
          
            setError(null)
            setProcessing(false)
            setSucceeded(true)
          }
    
      }
    
      const handleChange = (e) => {
        
        setDisabled(e.empty)
        setError(e.error ? e.error.message: "")
      }

      const cardStyle = {
        style:{
          base:{
            color:"#32325d",
            fontFamily:"Arial, sans-serif",
            fontSmoothing:"antialiased",
            fontSize:"18px",
            ";;placeholder":{
              color:"#0e5d3b",
            }
          },
          invalid:{
            color:"#fa755a",
            iconColor:"#fa755a"
          }
        }
      }

  return (
    <>
         <p className={succeeded ? "result-message" : "result-message hidden"} >Payment Success</p>
        {!succeeded && <p>{error}</p>}
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
            <CardElement
                id="card-element"
                options={cardStyle}
                onChange={handleChange}
            />
            <button
            className="stripe-button"
            disabled={processing || disabled || succeeded} 
            >
                <span
                id="button-text"
                >
                {processing ? <div className="spinner" id="spinner" ></div>:"pay" }
                </span>
            </button>
        </form>
    </>
  )
}

export default StripeCheckout