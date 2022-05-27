import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import "../App.css"

function Order({order}) {

    const {orderStatus, paymentIntent, createdAt, products} = order;
  return (
    <Card sx={{ minWidth: 330, height:400}}>
    <CardContent style={{marginBottom:"1rem"}} >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Order Status: {orderStatus}
      </Typography>
      {/* <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography> */}
      {/* <Typography  color="text.secondary">
        order id: {id}
      </Typography> */}
      <Typography  color="text.secondary">
        amount: k{(paymentIntent.amount/100).toFixed(2)}
      </Typography>
      <Typography  color="text.secondary">
        method: {paymentIntent.payment_method_types[0]}
      </Typography>
      <Typography  color="text.secondary">
        ordered on: {new Date(createdAt?.toDate()).toUTCString() }
      </Typography>
      <div className="products-container" >
      {products.map(product => (
          <CardHeader
          avatar={
            <Avatar src={product?.images[0]?.url} variant="square" />
            
          }
          title={`${product.title} - k${ Number(product?.price).toFixed(2)} x ${product.count}`}
          subheader={`Shipping:${product.shipping.toUpperCase()}`}
        />
      ))}
      </div>
      <br/>
    </CardContent>
  </Card>
  )
}

export default Order