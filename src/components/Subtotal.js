import React from 'react';
import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format';
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material';

const useStyles = makeStyles({
   button:{
        width:"298px",
        marginTop:"1.8rem !important",
        marginBottom:"0.4rem !important",
        borderRadius:"10px !important",
        backgroundColor:"#0e5d3b  !important",
        color:"#ffffff !important",
        fontSize:"16px !important",
        padding: "8px 0 !important"
    },
})

function Subtotal() {

    const classes = useStyles()

  return(
    <Container>
            <CurrencyFormat 
                renderText={(value) => (
                <>
                    <p>
                        Subtotal({4} items):
                        <strong>{value}</strong>
                    </p>
                </>
                )}
                decimalScale={2}
                value={1000}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
           <Button 
            className={classes.button}
            variant="contained">Login</Button>
        </Container>
  ) 
}

export default Subtotal;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 150px;
    padding: 20px;
    background-color: #C5CDD8;
    /* border: 1px solid #dddddd; */
    border-radius: 3px;
    box-shadow:1px 3px 13px 0px rgba(193,185,185,0.72);
    
`

// const Button = styled.button`
//     background-color: #f0c14b;
//     border-radius: 12px;
//     width: 100%;
//     border: 1px solid;
//     color: #111;
//     background-color: #a88734 #9c7e31 #846a29;
//     padding: 10px ;
// `
