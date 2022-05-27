import React from 'react'
import styled from 'styled-components'
import "react-multi-carousel/lib/styles.css";
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Header from '../components/header/Header'
import Slider from '../components/Slider'
import Browse from '../components/browse/Browse';
import Row from '../components/products/Row';
import { CircularProgress } from '@mui/material'
import { db } from '../firebase';

function Homepage() {

  const [newArrivals, setNewArrivals] = React.useState([])
  const [bestSellers, setBestSellers] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const getNewArrivals = () => {
    setLoading(true)
    db.collection("Product").orderBy("createdAt","desc").limit(4)
    .onSnapshot((snapshot) => {
      setNewArrivals(
        snapshot.docs.map(doc => (
        {
            id: doc.id,
            data: doc.data()
        }
        )))
        setLoading(false)
    })
  }

  const getBestSellers = () => {
    setLoading(true)
    db.collection("Product").orderBy("sold","desc").limit(4)
    .onSnapshot((snapshot) => {
      setBestSellers(
        snapshot.docs.map(doc => (
        {
            id: doc.id,
            data: doc.data()
        }
        )))
        setLoading(false)
    })
  }

  React.useEffect(() => {
    getNewArrivals();
    getBestSellers();
  },[])

    return (

      <div style={{height:'100%', backgroundColor:'#f0f5f1'}}>
           <Header /> 
          <Home>
              <Slider/>
              <Browse/>
              {/* {JSON.stringify(newArrivals)} */}
              {loading ?<Loading><CircularProgress color="success" /></Loading>  :
              (
                <>
                  <Row 
                  
                  products={newArrivals}
                  title="just in"
                  />
                  <Row 
                  
                  products={bestSellers}
                  title="top picks"
                  />
                </>
              )
              } 
              
              <Categories/>
        </Home>
        <Footer/>
      </div>
          
    )
}

const Home = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width: 1366px;
    // background-color:#f0f5f1;
    padding-bottom: 2rem;
`

const Loading = styled.div`
    text-align: center;
    margin-top:16%;
    margin-bottom:16%;
    height: 40%;
`
//   width: 100vw;
//   /* max-width: 1366px; */
//   justify-content: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;




export default Homepage
