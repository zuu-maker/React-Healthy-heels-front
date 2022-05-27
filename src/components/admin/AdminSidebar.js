import React from 'react'
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom";
import { auth } from '../../firebase';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles({
    container:{
        marginTop:"3.7rem",
        // paddingLeft:"0.5rem",
        // paddingRight:"0.5rem",
        borderRight:"solid 1.5px whitesmoke",
        height: "100vh",
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


function AdminSidebar() {

    const classes = useStyles();
    let history = useHistory();
    let dispatch = useDispatch();

    const logout = async () => {
        await auth.signOut();
        dispatch({
            type:"LOGOUT",
            payload: null
        });
    }

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index, pushTo) => {
        setSelectedIndex(index);
        history.push(pushTo);
        
      };


    return (
        <div className={classes.container}>
            <List >
                <ListItem 
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0, "/admin/dashboard")}
                className={classes.link} 
                >
                  <ListItemIcon>
                    <DashboardIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="DASHBOARD"
                  />
                </ListItem>
                <ListItem 
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1, "/admin/product")}
                className={classes.link} 
                >
                  <ListItemIcon>
                    <CreateIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="PRODUCT"
                  />
                </ListItem >
                <ListItem 
                className={classes.link} 
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2, "/admin/products")}
                > 
                  <ListItemIcon>
                    <InventoryIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="PRODUCTS"
                  />
                </ListItem>
                <ListItem 
                className={classes.link} 
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3, "/admin/category")}
                >
                  <ListItemIcon>
                    <CategoryIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="CATEGORY"
                  />
                </ListItem>
                <ListItem
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4, "/admin/coupon")}
                className={classes.link} >
                  <ListItemIcon>
                    <PaidIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="COUPON"
                  />
                </ListItem>
                <ListItem 
                className={classes.link} 
                onClick={() => history.push("/")}
                >
                  <ListItemIcon>
                    <HomeIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="GO TO HOME"
                  />
                </ListItem>
                <ListItem 
                onClick={logout}
                className={classes.link} >
                  <ListItemIcon>
                    <LogoutIcon className={classes.link} />
                  </ListItemIcon>
                  <ListItemText
                    primary="LOGOUT"
                  />
                </ListItem>
                
            </List>
           
        </div> 
    )
}

export default AdminSidebar