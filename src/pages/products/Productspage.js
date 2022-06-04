import { CircularProgress, Grid, Pagination } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/header/Header'
import Product from '../../components/products/Product'
import Sidebar from '../../components/sidebar/Sidebar'
import { db } from '../../firebase'
import {useSelector} from 'react-redux'
import { fetchProducts } from '../../functions/product'

function Productspage() {

    const [products, setProducts] = React.useState([]);
    const [showPaginate, setShowPaginate] = React.useState(true);
    const [page, setPage] = React.useState(null);
    const [lastDoc, setLastDoc] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [productsCount, setproductsCount] = React.useState(1);
    const { search } = useSelector((state) => ({...state}));
    const { text } = search;
    const [option, setOption] = React.useState("createdAt");

    React.useEffect(() => {
        
        setLoading(true)

        getProducts(lastDoc)
        setShowPaginate(true)

        // eslint-disable-next-line
    },[page])

    React.useEffect(() => {
        
        setLoading(true)

        getProducts(lastDoc)
        setShowPaginate(true)

       // eslint-disable-next-line
    },[option])

    React.useEffect(() => {
        db.collection("Product").onSnapshot((snap) =>{
            setproductsCount(snap.docs.length)
         })
    },[])

    React.useEffect(() => {
        if(text){
            let _text = text.toLowerCase()
            const delayed = setTimeout(() => {
                fetchProducts({query: _text})
                .get()
                .then((res) => {
                    setProducts(
                        res.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )
                    setShowPaginate(false)
                })
                .catch(err => {
                    console.log(err);
                })
            },400)
            return () => clearTimeout(delayed)
        }else{
        setLoading(true)
        getProducts(lastDoc)
        setShowPaginate(true)
        }
    // eslint-disable-next-line  
    },[text])
    
    const getProducts = (last) => {

        const query = db.collection("Product")
        .orderBy(option,"desc")
        .limit(5);

        // if(option === "recent"){
        //     const query = db.collection("Product")
        //     .orderBy("createdAt","desc")
        //     .limit(5);
        // }else if(option === "sold"){
        //     const query = db.collection("Product")
        //     .orderBy("sold","desc")
        //     .limit(5);
        // }
       

        if(last && page === 2){
            query
            .startAfter(last)
            .get()
            .then((documentSnapshots) => {
                setProducts(
                    documentSnapshots.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length-1])
                setLoading(false)
            })
            
        }
        else if(last && page === 1){
            query.get()
            .then((documentSnapshots) => {
                setProducts(
                    documentSnapshots.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length-1])
                setLoading(false)
            })
            
        }
        else{
            query.get()
            .then((documentSnapshots) => {
                setProducts(
                    documentSnapshots.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length-1])
                setLoading(false)
            })
        }
        
   }

   const handleOnChange = (e,value) => {
        setPage(value);
   }

    return (
        <>
        <Header />
        <Container>
            <Left>
                <Sidebar
                option={option}
                setOption={setOption}
                />
            </Left>
            <Right>
                <HeadingRight>
                 {text && products.length > 0 ? "Results" : "All Products"}   
                </HeadingRight>
               {loading ?<Loading><CircularProgress color="success" /></Loading>  : (
                   <>
                     <Grid sx={{marginTop:'0.7rem' }}justifyContent="center" alignItems="center"  container rowSpacing={1} columnSpacing={{sm:2, md:2, lg:4}}>
                        
                        
                        {
                        
                        products.map((product) => (
                            <div key={product.id}>
                                <Grid  item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <Product key={product} id={product.id} data={product.data}/>
                                </Grid>
                            </div>
                    ))}
               </Grid>
              {showPaginate && 
              <Paginate>
                  <Pagination 
                    showFirstButton  
                    hidePrevButton 
                //    page={page}
                //    defaultPage={0}
                    count={Math.ceil(productsCount/5)} 
                    onChange={handleOnChange}  />
              </Paginate>
              } 
                   </>
               )} 
            </Right>
        </Container>
        <Footer/>
        </>
    )
}

export default Productspage

const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width: 1366px;
    width: 100%;
    display: flex;
    margin-top: 4.5rem;
    margin-bottom: 1rem;
    min-height: 900px;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`

const Paginate = styled.div`
    display:flex;
    justify-content:center;
`

const Left = styled.div`
    flex: 0.06;
`

const Loading = styled.div`
    text-align: center;
    width:100%;
    height:70vh;
    margin-top:20%;
`

const Right = styled.div`
    flex: 0.94;
    margin-left:1rem;
    text-align:center;
    @media (max-width: 424px) {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 3rem;
        width: 100%;
        flex: 1;
        
    }
`

const HeadingRight = styled.h3`
    font-size: 2rem;
    color: #727375;
    margin-top: 20px;
    @media (max-width: 600px) {
        font-size: 1.6rem;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
`


