import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { db } from "../../firebase";
import {useSelector} from "react-redux";

export default function CheckoutForm() {
  const {user} = useSelector((state) => ({...state}));
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const test = () => {
    db.collection("Cart").where("orderedBy","==",user.email)
    .get()
    .then(doc => {
        doc.docs[0].data().cart.map(item => {
        let id = item.id;
        db.collection('Product').doc(item.id).collection('sizes')
        .where("size","==",item.size)
        .get()
        .then(doc => {
            // eslint-disable-next-line
            doc.docs.map(i => {
              
                db.collection('Product').doc(item.id).collection('sizes').doc(i.id).update({quantity: firebase.firestore.FieldValue.increment(-item.count)})
            })
            alert("decrement")
            db.collection('Product').doc(item.id).update({quantity: firebase.firestore.FieldValue.increment(-item.count)})
        })
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    db.collection("Cart").where("orderedBy","==",user.email)
    .get()
    .then(doc => {
        doc.docs[0].data().cart.map(item => {
        let id = item.id;
        db.collection('Product').doc(item.id).collection('sizes')
        .where("size","==",item.size)
        .get()
        .then(doc => {
            // eslint-disable-next-line
            doc.docs.map(i => {
                let dec = parseInt(item.count) * -1;
                alert(dec)
                db.collection('Product').doc(item.id).collection('sizes').doc(i.id).update({quantity: firebase.firestore.FieldValue.increment(dec)})
            })
            
            let dec = parseInt(item.count) * -1;
            db.collection('Product').doc(item.id).update({quantity: firebase.firestore.FieldValue.increment(dec)})
            alert("decrement")
        })
      })
    })
    setIsLoading(false);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(true);

  };

  return (
    <>
    
     <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      <div id="payment-message"><span>hello</span></div>
    </form>
    </>
   
  );
}