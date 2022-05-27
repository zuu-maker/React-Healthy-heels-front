import React,{useEffect, lazy, Suspense } from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { auth, db } from './firebase';
import { CircularProgress, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Homepage = lazy(() => import('./pages/Homepage'));
const Productspage = lazy(() => import('./pages/products/Productspage'));
const Productpage = lazy(() => import('./pages/products/Productpage'));
const Loginpage = lazy(() => import('./pages/auth/Loginpage'));
const Registerpage = lazy(() => import('./pages/auth/Registerpage'));
const Cart = lazy(() => import('./pages/Cart'));
const RegisterFinishpage = lazy(() => import('./pages/auth/RegisterFinishpage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminCategory = lazy(() => import('./pages/admin/AdminCategory'));
const UpdateCategory = lazy(() => import('./pages/admin/UpdateCategory'));
const AdminProduct = lazy(() => import('./pages/admin/AdminProduct'));
const AllProducts = lazy(() => import('./pages/admin/AllProducts'));
const UpdateProduct = lazy(() => import('./pages/admin/UpdateProduct'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const Checkout = lazy(() => import( './pages/payment/Checkout'));
const Payment = lazy(() => import('./pages/payment/Payment'));
const Orders = lazy(() => import('./pages/orders/Orders'));

function App() {

  let snack = useSelector((state) => state.snack);
  let dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        
        const idTokenResult = await user.getIdTokenResult()

        db.collection("Users").where("email", "==", user.email)
        .get()
        .then((querySnapshot) => {
          let userData;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
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
            // alert("yeah");
        })
        .catch((err) => {
            console.log(err);
        })
      }
        
      
    })

    return () => unsubscribe()
    // eslint-disable-next-line
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type:"SET_SNACK",
      payload:{
         open:false,
         message:""
      }
    });
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
  )

  return (
    
    <Suspense fallback={
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh' }} >
        _ L<CircularProgress color="success" size="12px" />ading Healthy Heels _
      </div>
    } >
      <SideDrawer/>
      <Snackbar
      open={snack?.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={snack?.message}
      action={action}
      />
      <Switch>
        {/* {JSON.stringify(user)} */}
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/products">
          <Productspage />
        </Route>
        <Route exact path="/products/:query">
          <Productspage />
        </Route>
        <Route exact path="/product/:slug">
          <Productpage/>
        </Route>
        <Route exact path="/login">
          <Loginpage/>
        </Route>
        <Route exact path="/register/complete">
          <RegisterFinishpage/>
        </Route>
        <Route exact path="/register">
          <Registerpage/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
        <UserRoute exact path="/checkout">
          <Checkout/>
        </UserRoute>
        <UserRoute exact path="/payment">
          <Payment/>
        </UserRoute>
        <UserRoute exact path="/user/history">
          <Orders/>
        </UserRoute>
        <AdminRoute exact path="/admin/dashboard">
          <AdminDashboard/>
        </AdminRoute>
        <AdminRoute exact path="/admin/category">
          <AdminCategory/>
        </AdminRoute>
        <AdminRoute exact path="/admin/category/:cid">
          <UpdateCategory/>
        </AdminRoute>
        <AdminRoute exact path="/admin/product">
          <AdminProduct/>
        </AdminRoute>
        <AdminRoute exact path="/admin/products">
          <AllProducts/>
        </AdminRoute>
        {/* <AdminRoute exact path="/admin/products/:slug">
          <AllProducts/>
        </AdminRoute> */}
        <AdminRoute exact path="/admin/product/:slug">
          <UpdateProduct/>
        </AdminRoute>
      </Switch>
    </Suspense>
    
  );
}

export default App;
