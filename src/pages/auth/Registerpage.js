import React, {useState} from 'react';
import { Button, FormControl, IconButton, LinearProgress, Snackbar, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles'
import {useDispatch,useSelector} from 'react-redux'
import { auth } from '../../firebase';

const useStyles = makeStyles({
    container:{
        display: "flex !important",
        height: "100vh",
        backgroundColor:"#F0EAD6"
    },
    innerContainer: {
        textAlign: "center",
        // marginTop:"2.8%",
        margin:"auto",
        height: "86vh !important",
        width:"32%",
        borderRadius: "16px",
        // marginTop:"10.2%",
        // margin:"auto",
        // backgroundColor:"red",
        // border: "1px solid grey",
        boxShadow:"1px 3px 13px 0px rgba(193,185,185,0.72)",
        '@media (max-width: 780px)' : {
          width:"82%",
          height: "56vh !important",
        }
    },
    input:{
        width:"298px",
        borderRadius:"10px !important",
        marginTop:"20px !important",
    },
    button:{
        width:"298px",
        marginTop:"1.8rem !important",
        marginBottom:"2.2rem !important",
        borderRadius:"10px !important",
        backgroundColor:"#0e5d3b !important",
        color:"#ffffff !important",
        fontSize:"16px !important",
        padding: "8px 0 !important"
    },
    infoContainer: {
        // width: "298px",
    },
    info:{
        textAlign:"left",
        color: "#3F51B5",
        marginTop: "4px !important",
    },
    checkbox:{
        textAlign:"left",
        marginTop:"12px"
    },
    heading:{
        // marginTop:"1.4rem",
        marginTop:"38%",
        marginBottom:"1.4rem",
        color:"#0e5d3b "
    }
})

function Registerpage() {

    let loader = useSelector((state) => state.loader);
    let dispatch = useDispatch();
    const classes = useStyles();
    
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //   setOpen(true);
    // };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const action = (
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
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
        // alert(email)
        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        // const config = {
        //     url: process.env.REACT_APP_REGISTRATION_REDIRECT_URL,
        //     handleCodeInApp:true
        // }

        const config = {
          url: "https://6e47-43-245-222-164.ngrok.io/register/complete",
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
            alert(err.message)
        })
           
    } 

  return (
    <>
    {loader && <LinearProgress color="success" />}
      <div className={classes.container}>
        <div className={classes.innerContainer}>
            {/* {JSON.stringify(loader)} */}
          <FormControl>
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
      
          <Button 
          // onClick={() => navigate("/")}
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
          variant="contained"
        //   onClick={register}
          >Register</Button>
          
          </FormControl>
      </div>
    </div>
    <Snackbar
        open={open}
        autoHideDuration={9000}
        onClose={handleClose}
        message={`Email has been sent to ${window.localStorage.getItem("registrationEmail")}. Please click verification link to complete registration.`}
        action={action}
      />
    </>
  );
}

export default Registerpage;
