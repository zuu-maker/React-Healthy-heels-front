import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'
import { Divider } from '@mui/material';
import OrderProduct from './OrderProduct';

export default function Order({id,order}) {

  return (
      
    <Card sx={{marginBottom:'3rem'}}>
        <CardContent style={{display:'flex', backgroundColor:'#f0f5f1'}}>
            <HeaderItem>
                <Typography variant="p" component="div">
                    Order Number
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {id}
                </Typography>
            </HeaderItem>

            <HeaderItem>
                <Typography variant="p" component="div">
                    Date Placed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {new Date(order?.createdAt?.toDate()).toUTCString()}
                </Typography>
            </HeaderItem>

            <HeaderItem>
                <Typography variant="p" component="div">
                    Total Amount
                </Typography>
                <Typography variant="body2" color="text.secondary">
                k{(order?.paymentIntent.amount/100).toFixed(2)}
                    
                </Typography>
            </HeaderItem>
            <Divider />
        </CardContent>
        {order && order.products && order.products.map((p,i) => <OrderProduct key={i} product={p} status={order.orderStatus}/> )}
           
    </Card>
  );
}

const HeaderItem = styled.div`
    margin-left:0.8rem;
`

