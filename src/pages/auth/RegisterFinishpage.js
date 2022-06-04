import React from 'react';
import { Button, FormControl, LinearProgress, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../../firebase';
import firebase from 'firebase';

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
        '@media (max-width: 780px)' : {
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
        '@media (max-width: 780px)' : {
            width:"220px"
          }
    },
    heading:{
        marginTop:"3rem",
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

function RegisterFinishpage() {

    let history = useHistory();
    let {loader} = useSelector((state) => ({...state}));
    let dispatch = useDispatch();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setEmail(window.localStorage.getItem("registrationEmail"))    
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        if(!email) {
            setError("Please finish registration process in the same browser")
            setShowError(true)
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            return;
        }

        if(!email && !password) {
            setError("Please enter your email address and password")
            setShowError(true)
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            return;
        }

        if(password.length < 6) {
            setError("Please enter your email address and password")
            setShowError(true)
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            return;
        }

        if(!name) {
            setError("Please enter your name")
            setShowError(true)
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            return;
        }

        try{ 
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if(result.user.emailVerified){

                window.localStorage.removeItem("registrationEmail");

                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                db.collection("Users").add({
                    name:name,
                    role:"subscriber",
                    cart:[],
                    email:email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((doc) => {
                    doc.update({id:doc.id});

                    dispatch({
                        type:"LOGGED_IN_USER",
                        payload:{
                            id:doc.id,
                            name:name,
                            email:user.email,
                            token:idTokenResult.token,
                            role:"subscriber",
                        }
                    });
                })

                history.push("/")

            }
        }catch(err){
            console.log(err.message);
        }

        // history.push("/")

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
            <h1 className={classes.heading}>Registration</h1>
            <TextField
            autoFocus
            required={true}
            label="Name"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            color="success"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <TextField
            label="Email"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            color="success"
            disabled
            value={email}
            />
            <TextField
            type="password"
            required={true}
            label="Password"
            className={classes.input}
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="outlined"
            size="small"
            color="success"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            {showError && <Typography color="error" variant="caption" className={classes.error}  >
                {error}
            </Typography>}
            <Button 
            className={classes.button}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            >Complete Registration</Button>
            
            </FormControl>
        </div>
      </div>
      </>
      
  ) 
  
}

export default RegisterFinishpage;
