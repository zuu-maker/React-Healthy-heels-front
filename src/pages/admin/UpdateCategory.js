import React from 'react';
import { makeStyles } from '@mui/styles';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Box, Button, Grid, TextField } from '@mui/material';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';

import { updateCategory } from '../../functions/category';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    innerContainer:{
        marginTop:"4rem !important",
        // paddingLeft:"0.5rem",
        // paddingRight:"0.5rem",
        // borderRight:"solid 1.5px whitesmoke",
        // height: "100vh",
    },
    wrapper:{
        marginTop:"0.8rem",
    },
    heading:{
        color:"#555",
        marginLeft:"1.2rem",
        marginBottom:"0.5rem",
        fontWeight:"400"
    },
    link:{
        color:"#0e5d3b",
        // border: "1px solid #555",
        // borderRadius:"7px " ,
        // padding: "1px 3px",
        // marginRight:"4px !important",
        cursor: "pointer",
        fontWeight:"bold !important"
    },
    button:{
        marginTop:'0.5rem !important',
        backgroundColor:"#0e5d3b  !important",
        color:"#ffffff !important",
    }
})

function UpdateCategory() {

    let history = useHistory();
    let params = useParams()
    const classes = useStyles();
    const[name, setName] = React.useState("")
    let dispatch = useDispatch();;

    React.useEffect(() => {
        const unsubscribe =db.collection("Category").doc(params.cid)
        .onSnapshot(doc => {
            setName(doc.data().name)
        })

        return () => unsubscribe()
    },[params.cid])

    const handleUpdate = (e) => {

        e.preventDefault();

        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        updateCategory(params.cid, name)
        .then(() => {
            alert('Updated category')
            history.push("/admin/category")
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
        })

        

        // db.collection("Category").doc(params.cid)
        // .update({
        //     name: name,
        //     slug:slug,

        // })
    }

    return (
        <>
          <Header /> 
          <Grid container>
              <Grid item sm={2.5}>
                <AdminSidebar/>
              </Grid>
              <Grid className={classes.innerContainer} item sm={9.5}>
                <div className={classes.wrapper}>
                <h2 className={classes.heading}>Update Category</h2>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginLeft:'0.5rem'
                    }}
                    >
                    <TextField 
                    fullWidth 
                    label="Name" 
                    id="fullWidth"
                    color="success"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                        <Button 
                        onClick={handleUpdate}
                        className={classes.button} 
                        variant="contained">
                        Save
                        </Button>
                    </Box>
                </div>
              </Grid>
            </Grid>
        </>
      );
}

export default UpdateCategory;
