import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import OrderProduct from './OrderProduct';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    content:{
        display:'flex',
        backgroundColor:'#f0f5f1',
        
        '@media (max-width: 600px)' : {
           flexDirection:'column'
          }
    },
    HeaderItem:{
        marginLeft:'0.8rem',
        '@media (max-width: 600px)' : {
            marginBottom:'0.25rem'
        }
    }
})

export default function Order({id,order}) {

    const classes = useStyles()

  return (
      
    <Card sx={{marginBottom:'3rem'}}>
        <CardContent className={classes.content}>
            <div className={classes.HeaderItem} >
                <Typography variant="p" component="div">
                    Order Number
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {id}
                </Typography>
            </div>

            <div className={classes.HeaderItem}>
                <Typography variant="p" component="div">
                    Date Placed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {new Date(order?.createdAt?.toDate()).toJSON() }
                </Typography>
            </div>

            <div className={classes.HeaderItem}>
                <Typography variant="p" component="div">
                    Total Amount
                </Typography>
                <Typography variant="body2" color="text.secondary">
                k{(order?.paymentIntent.amount/100).toFixed(2)}
                    
                </Typography>
            </div>
            <Divider />
        </CardContent>
        {order && order.products && order.products.map((p,i) => <OrderProduct key={i} product={p} status={order.orderStatus}/> )}
           
    </Card>
  );
}

