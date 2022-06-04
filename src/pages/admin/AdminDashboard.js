import { Grid } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Header from '../../components/header/Header';
import { db } from '../../firebase';
import AdminOrders from '../../components/admin/AdminOrders';
import styled from 'styled-components'

const useStyles = makeStyles({
  innerContainer:{
      marginTop:"4rem !important",
      // paddingLeft:"0.5rem",
      // paddingRight:"0.5rem",
      // borderRight:"solid 1.5px whitesmoke",
      // height: "100vh",
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
  }
})

function AdminDashboard() {

  const classes = useStyles();

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    db.collection("Order")
    .orderBy("lastUpdatedAt","asc")
    .onSnapshot((snap) => {
      setOrders(snap.docs.map(doc => ({id:doc.id, data:doc.data()})))
    })
  },[])

  return(
    <>
      <Header /> 
      <Grid container>
          <Grid item sm={2}>
            <AdminSidebar/>
          </Grid>
          <Grid className={classes.innerContainer} item sm={10}>
                <div>
                <Title> Dashboard - Orders </Title>
                </div>
                
                {orders && <AdminOrders
                orders={orders}
                />}
          </Grid>
        </Grid>
    </>
  ) ;
}

export default AdminDashboard;

const Title = styled.h3`
    margin-right: 15px;
    border-bottom: 1px solid lightgray;
    padding: 20px;
    color: #0e5d3b  !important;
    font-weight: 900 !important;
`
