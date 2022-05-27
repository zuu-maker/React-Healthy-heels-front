import React from 'react';
import { makeStyles } from '@mui/styles';
import Header from '../../components/header/Header';
import { Grid } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { db } from '../../firebase';
import AdminProductCard from '../../components/admin/AdminProductCard';

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
    }
})

function AllProducts() {

    const [products, setProducts] = React.useState([]);
    const classes = useStyles();

    React.useEffect(() => {
        const unsubscribe = db.collection("Product")
        .onSnapshot((snapshot) => {
            setProducts(
                snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
                )))
        })

        return () => unsubscribe();
    },[])

  return (
      <>
      <Header /> 
      <Grid container>
          <Grid item sm={2.5}>
            <AdminSidebar/>
          </Grid>
          <Grid className={classes.innerContainer} item sm={9.5}>
            <div className={classes.wrapper}>
                <h2 className={classes.heading}>All Products</h2>
                {/* {JSON.stringify(products[2]?.data)} */}
                <Grid style={{height:"maxContent"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((product) => (
                        <Grid item xs={2} sm={4} md={4} key={product.id}>
                            
                            <AdminProductCard item={product} />
                        </Grid>
                    ))}
                </Grid>
                
            </div>
          </Grid>
        </Grid>
    </>
  );
}

export default AllProducts;
