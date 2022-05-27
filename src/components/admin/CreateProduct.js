import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { db } from '../../firebase';
import { createProduct } from '../../functions/product';
import { useDispatch } from 'react-redux';
import FileUpload from './FileUpload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const initialState = {
    title:"",
    description:"",
    price:0,
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
    sizeContainer:{
        marginTop:"0.8rem",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
    heading:{
        color:"#555",
        marginLeft:"0.5rem",
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
        marginRight:'1rem !important',
        backgroundColor:"#0e5d3b  !important",
        color:"#ffffff !important",
    },
    input:{
        marginBottom:'0.8rem !important',
    }
})

function CreateProduct() {

    const classes = useStyles();
    let dispatch = useDispatch();
    const [values,setValues] = React.useState(initialState);
    const [categories, setCategories] = React.useState([]);
    const [savedSizes, setSavedSizes] = React.useState([]);
    const [showSizes, setShowSizes] = React.useState(false);
    const [id, setID] = React.useState("");
    const [size, setSize] = React.useState(0);
    const [quan, setQuan] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);

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
        values.price = parseInt(values.price)
        values.title = values.title.toLowerCase()
        alert(values.title)
        createProduct(values)
        .then(() => {
            
            alert("sucess");
           
            dispatch({
                type:"SET_LOADER",
                payload:false
            })
            setValues({...values, images: []});
            setValues(initialState);
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

    const handleDelete = (_id) => {
        db.collection("Product").doc(id).collection("sizes").doc(_id).delete()
    }

    const handleSubmitAndAddSizes = (e) => {
        e.preventDefault();
        dispatch({
            type:"SET_LOADER",
            payload:true
        })

        createProduct(values)
        .then((doc) => {
            setID(doc.id);
            dispatch({
                type:"SET_SNACK",
                payload:{
                   open:true,
                   message:"Product has been created successfully"
                }
              });
           
            dispatch({
                type:"SET_LOADER",
                payload:false
            })

            db.collection("Product").doc(doc.id)
            .collection("sizes")
            .onSnapshot((snapshot) => {
                setSavedSizes(
                  snapshot.docs.map(doc => (
                  {
                      id: doc.id,
                      data: doc.data()
                  }
                  )))
              })
              console.log(savedSizes);
           

            setDisabled(true)
            setShowSizes(true);
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

    const addSize = () => {

        if(size <= 0){
            alert("Size can not be negative")
            return;
        }

        if(quan <= 0){
            alert("Quantity can not be negative")
            return;
        }

        if(!quan || !size){
            alert("fields can not be empty")
            return;
        }

        db.collection("Product").doc(id).collection("sizes").add({
            size:size,
            quan:quan,
            sold:0
        })
        .then((doc) => {
            // doc.update({id: doc.id})
            // db.collection("Product").doc(id).update({
            //     sizess:firebase.firestore.FieldValue.arrayUnion(doc.id)
            // })
            
            setSize(0)
            setQuan(0)

        })
        .catch(err => {
            console.log(err)
            alert("Error adding size")
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

    const finish = () => {
            setValues({...values, images: []});
            values.images = [];
            setValues(initialState);
            setShowSizes(false)
            window.location.reload(true)
    }

  return (
    <div className={classes.container}>
        <h2 className={classes.heading}>Create Product</h2>
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
            multiline
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
            </FormControl> */}

            {/* <FormControl className={classes.input} fullWidth>
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
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
            </FormControl>

            <Button 
            disabled={disabled}
            onClick={handleSubmitAndAddSizes}
            className={classes.button} 
            variant="contained">
            Add Sizes
            </Button>

            <Button 
            disabled={disabled}
            onClick={handleSubmit}
            className={classes.button} 
            variant="contained">
            Save Product
            </Button>

          {showSizes && (
              <div>
                  {/* {JSON.stringify(savedSizes)} */}
                  <p 
                  style={{marginTop:"1rem", fontWeight:"bold"}}
                  >Added Sizes and Quantities</p>
                  {savedSizes?.map(i => (
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
                    <DeleteIcon onClick={() => handleDelete(i.id)} color="error" />
                  </div>
                  ))}
                    <div className={classes.sizeContainer} >
                        <TextField 
                        id="standard-basic" 
                        label="size" 
                        variant="standard" 
                        type="number"
                        color="success"
                        value={size} 
                        onChange={(e) => setSize(e.target.value)}
                        />
                        <TextField 
                        id="standard-basic" 
                        label="quantity" 
                        variant="standard" 
                        type="number"
                        color="success" 
                        value={quan}
                        onChange={(e) => setQuan(e.target.value)}
                        />
                        <IconButton 
                        color="success" 
                        aria-label="upload picture" 
                        component="span"
                        onClick={addSize}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                    <Button 
                    onClick={finish}
                    className={classes.button} 
                    variant="contained">
                        Add Another Product
                    </Button>
              </div>
            
          )}  
        </Box>
        
    </div>
  );
}

export default CreateProduct;
