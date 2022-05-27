import React from 'react';
import { makeStyles } from '@mui/styles';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Grid } from '@mui/material';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import ProductUpdateForm from '../../components/admin/ProductUpdateForm';

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

function UpdateProduct() {

    let params = useParams();
    const classes = useStyles();
        // db.collection("Category").doc(params.cid)
        // .update({
        //     name: name,
        //     slug:slug,

        // })
    

    return (
        <>
          <Header /> 
          <Grid container>
              <Grid item sm={2.5}>
                <AdminSidebar/>
              </Grid>
              <Grid className={classes.innerContainer} item sm={9.5}>
                <ProductUpdateForm slug={params.slug} />
              </Grid>
            </Grid>
        </>
      );
}

export default UpdateProduct;
