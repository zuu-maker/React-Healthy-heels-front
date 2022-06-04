import React, { useState } from 'react';
import { Button, FormControl, LinearProgress, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { auth, db } from '../../firebase';

const useStyles = makeStyles({
    container: {
        display: "flex !important",
        height: "100vh",
        backgroundColor:"#F0EAD6",
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
    info:{
        textAlign:"left",
        color: "#0e5d3b",
        marginTop: "4px !important",
    },
    heading:{
        marginTop:"2.8rem",
        marginBottom:"2rem",
        color:"#0e5d3b ",
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

function Loginpage() {

    let dispatch = useDispatch()
    let loader = useSelector((state) => state.loader);
    let history = useHistory();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    React.useEffect(() => {
        if(error) setError("");
        // eslint-disable-next-line
    },[])

    const roleBasedRedirect = (userData) => {
        let intended = history.location.state;
        if( intended){
            history.push(intended.from);
        }else{
            if(userData.data.role === "admin") {
                history.push("/admin/dashboard");
            }else{
                history.push("/")
            }
        }
    }

    const handleSubimt = async (e) => {
        e.preventDefault();

        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            if(error) setError("");

            db.collection("Users").where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
                let userData;

                querySnapshot.forEach((doc) => {
                    userData = {
                        data:doc.data()
                    }
                });
        
                dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    id:userData.data.id,
                    name:userData.data.name,
                    email:user.email,
                    token:idTokenResult.token,
                    role:userData.data.role,
                }
                });

                roleBasedRedirect(userData)
               
            })
            .catch((err) => {
                    console.log(err);
            })

        }catch(error){
            console.log(error);
            setError(error.message)

        }

        dispatch({
            type:"SET_LOADER",
            payload:false
        })
    } 

    const signUp = () => {
        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        history.push("/register")

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

                    <FormControl className={classes.form}>
                    <h1 className={classes.heading}>Login</h1>
                    <TextField
                    className={classes.input}
                    autoFocus
                    label="Email"
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="outlined"
                    size="small"
                    type="email"
                    color="success"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                    label="Password"
                    className={classes.input}
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    size="small"
                    type="password"
                    color="success"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <Button 
                    onClick={handleSubimt}
                    className={classes.button}
                    type="submit"
                    variant="contained">Login </Button>
                        {error && <Typography variant="span" color="error" className={classes.error} >{error}</Typography>}
                    
                        <Typography  className={classes.info} variant="p">
                            Don't have an account? <Linker className={classes.link} onClick={signUp} >click here</Linker>
                        </Typography>
                        {/* <Typography className={classes.info} variant="p">
                            <span className={classes.link}>forgot passord</span>  
                        </Typography> */}
                    
                    </FormControl>
                </div>
            
        </div>
        </>
        
    )
}

export default Loginpage;

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

