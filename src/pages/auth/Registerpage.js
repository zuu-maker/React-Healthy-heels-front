import React, {useState} from 'react';
import { Button, FormControl, IconButton, LinearProgress, Snackbar, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    container:{
        display: "flex !important",
        height: "100vh",
        backgroundColor:"#F0EAD6"
    },
    innerContainer: {
      textAlign: "center",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'1rem',
        height: "86vh !important",
        width:"32%",
        borderRadius: "16px",
        margin:"auto",
        boxShadow:"1px 3px 13px 0px rgba(193,185,185,0.72)",
        '@media (max-width: 780px)' : {
            width:"max-content",
            height: "50vh !important",
          }
    },
    input:{
      width:"298px",
      borderRadius:"10px !important",
      marginTop:"20px !important",
      '@media (max-width: 600px)' : {
          width:"220px"
        }
    },
    button:{
      width:"298px",
      marginTop:"1.8rem !important",
      marginBottom:"0.4rem !important",
      borderRadius:"10px !important",
      backgroundColor:"#0e5d3b  !important",
      color:"#ffffff !important",
      fontSize:"16px !important",
      padding: "8px 0 !important",
      '@media (max-width: 600px)' : {
          width:"220px"
        }
    },
    info:{
      textAlign:"left",
      color: "#0e5d3b",
  },
    heading:{
        marginTop:"38%",
        marginBottom:"1.4rem",
        color:"#0e5d3b",
        '@media (max-width: 780px)' : {
          fontSize:'2rem'
        }
    },
    form:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    error:{
      fontSize:'1rem',
      '@media (max-width: 780px)' : {
          fontSize:'0.7rem'
        }
  }
})

function Registerpage() {

    let history = useHistory();
    let loader = useSelector((state) => state.loader);
    let dispatch = useDispatch();
    const classes = useStyles();
    const [error, setError] = useState("");
    
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
      if(error) setError("");
      // eslint-disable-next-line
    },[])
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        const config = {
          url: "https://healthy-heels-809aa.firebaseapp.com/register/complete",
          handleCodeInApp:true
      }

        auth.sendSignInLinkToEmail(email,config)
        .then(() => {
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            window.localStorage.setItem("registrationEmail", email);
            setOpen(true);
            
            setEmail("")
        })
        .catch((err) => {
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            setError(err.message)
        })
           
    } 

    const login = () => {
      dispatch({
          type:"SET_LOADER",
          payload:true
      })

      history.push("/login")

      dispatch({
          type:"SET_LOADER",
          payload:false
      })
  }

  return (
    <>
    {loader && <LinearProgress color="success" />}
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <FormControl className={classes.form} >
          <h1 className={classes.heading}>Enter Email</h1>
          <TextField
          autoFocus
          required={true}
          label="Email"
          type="email"
          className={classes.input}
          hiddenLabel
          id="filled-hidden-label-normal"
          variant="outlined"
          size="small"
          color="success"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          {error && <Typography variant="span" color="error" className={classes.error}>{error}</Typography>}
          <Button 
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          >Register</Button>
          
          <Typography  className={classes.info} variant="p">
                            Already have an account? <Linker className={classes.link} onClick={login} >click here</Linker>
                        </Typography>
          </FormControl>
      </div>
    </div>
    <Snackbar
        open={open}
        autoHideDuration={9000}
        onClose={handleClose}
        message={`Email has been sent to ${window.localStorage.getItem("registrationEmail")},Check spam. Please click verification link to complete registration and registration in the same browser thank you 😁.`}
        action={action}
      />
    </>
  );
}

export default Registerpage;

const Linker = styled.span`
    &:hover {
        color: #0e5d3b;
        text-decoration-color: #0e5d3b;
    }
    cursor: pointer;
    color:grey;
    text-decoration: underline;
    text-decoration-color: grey;

`
