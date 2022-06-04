import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { db } from '../../firebase';
import {updateProduct } from '../../functions/product';
import { useDispatch } from 'react-redux';
import FileUpload from './FileUpload';
import { useHistory } from "react-router-dom";

const initialState = {
    title:"",
    description:"",
    price:"",
    category:"",
    shipping:"",
    quantity:"",
    images:[],
}

const useStyles = makeStyles({
    container:{
        marginTop:"0.8rem",
        marginBottom:"1rem !important",
        // paddingLeft:"0.5rem",
        // paddingRight:"0.5rem",
        // borderRight:"solid 1.5px whitesmoke",
        // height: "100vh",
    },
    heading:{
        color:"#555",
        marginLeft:"0.5rem",
        marginBottom:"0.5rem",
        fontWeight:"400"
    },
    sizeContainer:{
        marginTop:"0.8rem",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
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
    },
    input:{
        marginBottom:'0.8rem !important',
    }
})

function ProductUpdateForm({slug}) {

    const history = useHistory();
    const classes = useStyles();
    let dispatch = useDispatch();
    const [sizes, setSizes] = React.useState([])
    const [values,setValues] = React.useState(initialState);
    const [categories, setCategories] = React.useState([]);
    const [id, setId] = React.useState(null)

    React.useEffect(() => {
        
        const unsubscribe = db.collection("Product").where('slug',"==",slug)
        .onSnapshot((querySnapshot) => {
            
            querySnapshot.forEach(doc => {
                setId(doc.id)
                setValues({...values,...doc.data()})
            })
        });
       
        return () => unsubscribe();
        // eslint-disable-next-line
    },[])

    React.useEffect(() => {
        if(id && id.length > 0){
            db.collection("Product").doc(id).collection("sizes")
            .orderBy("size")
            .get()
            .then((querySnap) => {
            setSizes(
                querySnap.docs.map(i => ({
                data:i.data()
                }))
            )
            })
        }
    },[id])

    React.useEffect(() => {
        const unsubscribe = db.collection("Category")
        .onSnapshot((snapshot) => {
            setCategories(
                snapshot.docs.map(doc => (
                {
                    name: doc.data().name,
                    slug: doc.data().slug,
                    id:doc.id
                }
                )))
        })

        return () => unsubscribe();
    },[])

    const handleChange = (e) => {
            setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        updateProduct(id,values)
        .then(() => {
            alert("sucess");
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            setValues({...values, images: []});
            setValues(initialState);
            history.push("/admin/products");
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type:"SET_LOADER",
                payload:false
            });
            setValues(initialState);
        })
    }

    const {
        title, 
        description,
        price,
        category,
        shipping,
        quantity,
    } = values;

  return (
    <div className={classes.container}>
        <h2 className={classes.heading}>Update Product</h2>
        {/* {JSON.stringify(values)} */}
        <Box
        sx={{
            width: 500,
            maxWidth: '100%',
            marginLeft:'0.5rem'
        }}
            >
            <FileUpload values={values} setValues={setValues} />
            <TextField 
            name="title"
            type="text"
            autoFocus
            fullWidth 
            label="Title" 
            id="fullWidth"
            color="success"
            autoComplete="off"
            className={classes.input}
            value={title}
            onChange={handleChange}
            />
            <TextField 
            name="description"
            type="text"
            fullWidth 
            label="Description" 
            id="fullWidth"
            color="success"
            autoComplete="off"
            className={classes.input}
            value={description}
            onChange={handleChange}
            />
            <TextField
            name="price" 
            type="number"
            fullWidth 
            label="Price" 
            id="fullWidth"
            color="success"
            autoComplete="off"
            className={classes.input}
            value={price}
            onChange={handleChange}
            />
            
            <TextField 
            name="quantity"
            type="number"
            fullWidth 
            label="Quantity" 
            id="fullWidth"
            color="success"
            autoComplete="off"
            className={classes.input}
            value={quantity}
            onChange={handleChange}
            />

            <FormControl className={classes.input} fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    {categories.map(item => <MenuItem value={item.slug}>{item.name}</MenuItem>)}
                </Select>   
            </FormControl>

            {/* <FormControl className={classes.input} fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                    name="color"
                    value={color}
                    label="Color"
                    onChange={handleChange}
                >
                    {colors.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                </Select>    
            </FormControl>

            <FormControl className={classes.input} fullWidth>
                <InputLabel >Brand</InputLabel>
                <Select
                    name="brand"
                    value={brand}
                    label="Brand"
                    onChange={handleChange}
                >
                    {brands.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl> */}

            <FormControl className={classes.input} fullWidth>
                <InputLabel >Shipping</InputLabel>
                <Select
                    name="shipping"
                    value={shipping}
                    label="shipping"
                    onChange={handleChange}
                >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                </Select>
            </FormControl>


            {sizes && sizes.length > 0 && sizes.map((i) =>(
                 <div className={classes.sizeContainer} >
                 <TextField 
               //   id="standard-basic" 
               //   label="size" 
                 variant="outlined" 
                 type="number"
                 color="success"
                 value={i.data.size} 
                 disabled
                 />
                 <TextField 
               //   id="standard-basic" 
               //   label="quantity" 
                 variant="outlined" 
                 type="number"
                 color="success" 
                 value={i.data.quan}
                 disabled                  
                 />
             </div>
            ))}

            <Button 
            onClick={handleSubmit}
            className={classes.button} 
            variant="contained">
            Save
            </Button>
        </Box>
        
    </div>
  );
}

export default ProductUpdateForm;
