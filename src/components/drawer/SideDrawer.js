import { Box, Button, Card, CardContent, CardMedia, Drawer, Typography } from '@mui/material';
import React from 'react'
import { useSelector ,useDispatch } from 'react-redux';
import { Link } from "react-router-dom"

function SideDrawer() {

  const { drawer, cart } = useSelector((state) => ({...state}));
  let dispatch = useDispatch();

  const toggleDrawer  = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch({
      type:"SET_DRAWER",
      payload:false
    })
  };

  const styles = {
    maxWidth: 220,
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:"1rem",
  }

  const card = (id,title, images, price) => {
    return(
      <Card key={id} sx={styles}>
      <CardMedia
        component="img"
        height="140"
        image={images[0].url}
        alt={images[0].ref}

      />
      <CardContent>
        <Typography >
          {title} - K{price}
        </Typography>
       
      </CardContent>
    </Card>
    )
  }

  return (
    <div>
        <Drawer
            anchor="right"
            open={drawer}
            onClose={toggleDrawer}
          >
            <Box
                sx={{ width: 250, textAlign: 'center', paddingTop:"3rem", paddingBottom:"3rem" }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
                >
              {/* {JSON.stringify(cart)} */}
              <h2
              style={{marginBottom:"1.2rem", fontWeight:"400", textDecoration:"underline"}}
              >{cart.length + " item(s) in cart"}</h2>
              {cart.map(item => card(item.id,item.title,item.images,item.price))}
              <Link
              style={{textDecoration:"none"}}
              to="/cart"
              >
                <Button
                style={{
                  marginLeft:"auto",
                  marginRight:"auto",
                }}
                variant="contained"
                color="success"
                >Proceed to Cart</Button>
              </Link>
             
            </Box>
          </Drawer>
    </div>
  )
}

export default SideDrawer