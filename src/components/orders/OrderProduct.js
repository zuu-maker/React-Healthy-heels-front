import React from 'react'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

function OrderProduct({product, status}) {
    
  return (
    <Content>
    <Left>
        <Avatar src={product.images[0].url} style={{width:'140px', height:'188px'}} sizes="64" variant="square"/>
    </Left>
    <Right>
        
        <Typography variant="p" component="div">
            {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.description}
        </Typography>
    
            {status === "Not Processed" && (
                <div style={{display:'flex',alignItems:'center', marginTop:'1rem'}}>
                    <HourglassBottomIcon fontSize="small" color="warning" />
                     <Typography variant="body2" color="text.secondary">
                        {status}
                    </Typography> 
                </div>
            )}
            {status === "Processing" && (
                <div style={{display:'flex',alignItems:'center', marginTop:'1rem'}}>
                        <HourglassFullIcon fontSize="small" color="info" />
                     <Typography variant="body2" color="text.secondary">
                        {status}
                    </Typography>
                </div>
            )}
             {status === "Cancelled" && (
                <div style={{display:'flex',alignItems:'center', marginTop:'1rem'}}>
                    <CancelIcon fontSize="small" color="error" />
                     <Typography variant="body2" color="text.secondary">
                        {status}
                    </Typography> 
                </div>
            )}
            {status === "Delivered" && (
                <div style={{display:'flex',alignItems:'center', marginTop:'1rem'}}>
                    <CheckCircleIcon fontSize="small" color="success" />
                     <Typography variant="body2" color="text.secondary">
                        {status}
                    </Typography> 
                </div>
            )}
   
    </Right>
</Content>
  )
}

export default OrderProduct

const Content = styled.div`
    padding:1rem;
    display:flex;
    justify-content: space-around;
`
const Left = styled.div`
    
`
const Right = styled.div`
   margin-left:1rem;
`