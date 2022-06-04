import React from 'react'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { FormControl, MenuItem, Select, TableRow, TextField } from '@mui/material';
import ModalImage from "react-modal-image";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';

function ProductCardCheckout({p}) {

  const [sizes,setSizes] = React.useState([]);
  const [size,setSize] = React.useState("");
  const [count,setCount] = React.useState(p.count);

  let dispatch = useDispatch();

  const handleRemove = () => {
    let cart = [];

    if(typeof window !== "undefined"){
      if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // eslint-disable-next-line
      cart.map((product,i) => {
        if(product.id === p.id){
          cart.splice(i,1);
        }
      })

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type:"ADD_TO_CART",
        payload: cart,
    })
    }
  }

  React.useEffect(() => {
    db.collection("Product").doc(p.id).collection("sizes").orderBy("size")
    .get()
    .then(snap => {
      setSizes(snap.docs.map(i => ({data: i.data()})))
    })

    // eslint-disable-next-line
  },[p.id])

  React.useEffect(() => {
    if(p && p.size){
      setSize(p.size)
    }
  },[p])

  const handleCount = (e) => {
    let _count = e.target.value < 1 ? 1 : e.target.value;
    
    let quantity;
    // eslint-disable-next-line
      sizes.map((s) =>{
        if(s.data.size === size){
          quantity = s.data.quan - s.data.sold;
        }
      })

    if(_count > quantity) {
      alert(`max quantity is ${quantity}`)
    }else{
      setCount(_count)

      let cart = [];

      if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // eslint-disable-next-line
        cart.map((product, i) => {
          if(product.id === p.id){
            cart[i].count = _count;
          }
        })
      }
      localStorage.setItem("cart",JSON.stringify(cart));
      dispatch({
        type:"ADD_TO_CART",
        payload: cart,
      })
    }

    
  }

  const handleSize = (e) => {
    setSize(e.target.value);
    let _size = e.target.value
      let cart = [];

      if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // eslint-disable-next-line
        cart.map((product, i) => {
          if(product.id === p.id){
            cart[i].size = _size;
          }
        })
      }
      localStorage.setItem("cart",JSON.stringify(cart));
      dispatch({
        type:"ADD_TO_CART",
        payload: cart,
      })

  }

  return (
    <TableBody>
            <TableRow
            >
              <TableCell >
                  <div style={{width:"100px", height:"auto"}} >
                    {p.images?.length ? (
                        <ModalImage small={p.images[0].url} large={p.images[0].url} />
                    ):(
                        <p>No Image</p>
                    )}
                  </div>  
              </TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={size}
                    color="success"
                    label="Size"
                    onChange={handleSize}
                  > 
                  {
                  // eslint-disable-next-line 
                  sizes.map((i,index) => {
                    if(i.data.quan - i.data.sold > 0){
                      return <MenuItem key={index} value={i.data.size}>{i.data.size}</MenuItem>
                    }
                  })}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
              K{parseInt(p.price).toFixed(2)}</TableCell>
              <TableCell>
              <TextField sx={{ width:"2.4rem"}} color="success" type="number" value={count} onChange={handleCount} variant="standard" />
                
              </TableCell>
              <TableCell>
              {p.shipping === "yes" ? <CheckCircleOutlineIcon style={{color:"#00ab66"}} fontSize="large"  />: <CancelIcon color="error" fontSize="large"  />}  
              </TableCell>
              <TableCell>
                <ClearIcon 
                color="error" 
                fontSize="large"
                onClick={handleRemove}
                style={{cursor:"pointer"}}
                />
              </TableCell>
            </TableRow>
        </TableBody>
  )
}

export default ProductCardCheckout