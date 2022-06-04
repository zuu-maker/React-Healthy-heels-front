import React from 'react'
import styled from 'styled-components'
import CheckOut from '../../components/products/CheckOut'
import Header from '../../components/header/Header'
import InfoContainer from '../../components/products/InfoContainer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useParams  } from 'react-router-dom';
import "../../App.css"
import { db } from '../../firebase'
import Footer from '../../components/Footer'
import Row from '../../components/products/Row'

function Productpage({match}) {

    let params = useParams();
    const [product, setProduct] = React.useState({});
    const [relatedProducts, setRelatedProducts] = React.useState([])
    const [sizes, setSizes] = React.useState([]);
    const [size, setSize] = React.useState("");
    const [id, setId] = React.useState("");

    let {slug} = params

    React.useEffect(() => {
        db.collection("Product")
        .where("slug","==",slug)
        .get()
        .then((querySnapshot) => {
            setProduct(querySnapshot.docs[0].data()) 
            setId(querySnapshot.docs[0].id)
            db.collection("Product").doc(querySnapshot.docs[0].id).collection("sizes")
            .orderBy("size")
            .get()
            .then((snap) => {
                setSizes(
                    snap.docs.map((doc) => ({
                        data: doc.data()
                    }))
                )
            })
        })
        // eslint-disable-next-line 
    },[slug])

    const getRelated = (item) => {
        if(item && item.category && item.category.length > 0)
        db.collection("Product").where("category","==",item?.category)
       .limit(4)
        .onSnapshot((snapshot) => {
            setRelatedProducts(
            snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data()
            }
            )))
        })
      }

      React.useEffect(() => {
          
          if(product) getRelated(product);  
      },[product])

    return (
        <Container>
            <Header/>
            
            <InnerContainer>
                <Left>
                 <CarouselContainer>
                   {product?.images?.length > 0 && (
                       <Carousel
                       showArrows={true}
                       autoPlay
                       infiniteLoop
                       >         
                           {product?.images?.map((image) => <img key={image.url} src={image.url} alt="" />)}
                       </Carousel>
                   )} 
                </CarouselContainer>
                
                </Left>
                <Right>
                    <RightContainer>
                            <InfoContainer 
                            data={product}
                            sizes={sizes}
                            setSize={setSize}
                            size={size}
                            />
                            <CheckOut
                            id={id}
                            data={product}
                            size={size}
                            />
                    </RightContainer>
                </Right>
            </InnerContainer>
            <Row
                id={id}
                products={relatedProducts}
                title="Related Products"
                />
            <Footer/>
        </Container>
    )
}

export default Productpage

const Container = styled.div`
    width: 100%;
`

const InnerContainer = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width: 1366px;
    display: flex;
    margin-top:5rem;
    margin-bottom:1rem;
    border-bottom: 1px solid #727375;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`
const RightContainer = styled.div`
     box-shadow: 1.5px 1.5px 14px 0 rgba(0,0,0,.2);
     padding: 1rem;
     width: 24rem;
     @media (max-width: 600px) {
        width: 85%;
    }
`

const Left = styled.div`
    flex: 0.55;
`

const CarouselContainer = styled.div`
    margin-Left: 0.5rem;
`

const Right = styled.div`
    flex: 0.45;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
