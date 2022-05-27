import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { createCategory } from '../../functions/category';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    container:{
        marginTop:"0.8rem",
    },
    heading:{
        color:"#555",
        marginLeft:"0.5rem",
        marginBottom:"0.5rem",
        fontWeight:"400"
    },
    link:{
        color:"#0e5d3b",
        cursor: "pointer",
        fontWeight:"bold !important"
    },
    button:{
        marginTop:'0.5rem !important',
        backgroundColor:"#0e5d3b  !important",
        color:"#ffffff !important",
    }
})

function CreateCategory() {

    const classes = useStyles();
    const [name, setName] = React.useState("")
    let dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type:"SET_LOADER",
            payload:true
        })
        
        createCategory(name)
        .then((res) => {
            console.log(res);
            dispatch({
                type:"SET_LOADER",
                payload:false
            });
            setName(" ");
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type:"SET_LOADER",
                payload:false
            });
            setName(" ");
        })

        
    }

  return (
    <div className={classes.container}>
        <h2 className={classes.heading}>Create Category</h2>
        {/* <Divider /> */}
        <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        marginLeft:'0.5rem'
      }}
    >
      <TextField 
      fullWidth 
      type="text"
      autoFocus
      label="Name" 
      id="fullWidth"
      color="success"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
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

export default CreateCategory;
