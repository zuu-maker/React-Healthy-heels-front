import React from 'react';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout} from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import { auth } from '../../firebase';

const menuItems = [
  {
  id:1,
  path:"/products",
  title:"Shop All",
  icon:(<LocalOfferIcon />),
  all:true,
  user:"subscriber"
  },
  {
    id:2,
    path:"/admin/dashboard",
    title:"Dashboard",
    icon:(<DashboardIcon />),
    all:false,
    user:"admin",
    loggedIn:true,
    },
    {
      id:3,
      path:"/user/history",
      title:"Orders",
      icon:(<AccountBoxIcon />),
      all:false,
      user:"admin",
      loggedIn:true,
      },
    {
      id:4,
      path:"/orders",
      title:"Orders",
      icon:(<AccountBoxIcon />),
      all:false,
      user:"subscriber",
      loggedIn:true,
      },
      {
        id:5,
        path:"/cart",
        title:"Cart",
        icon:(<ShoppingCartIcon />),
        all:true,
        user:"subscriber",
        loggedIn:false,
        },
        {
          id:6,
          path:"",
          title:"Logout",
          icon:(<Logout />),
          all:false,
          user:"subscriber",
          loggedIn:true,
          },
          {
            id:7,
            path:"/login",
            title:"Sign In",
            icon:(<LoginIcon />),
            all:false,
            user:"subscriber",
            loggedIn:false,
            },
]

function MenuCard({anchorEl, open, handleClose }) {

    let dispatch = useDispatch();
    let history = useHistory();
    const { user } = useSelector((state) => ({...state}));

    const logout = async () => {
        await auth.signOut()
        dispatch({
            type:"LOGOUT",
            payload: null
        })
        history.push("/login")
    }

  return (
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.2,
            '& .MuiAvatar-root': {
              width: 40,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 14,
              width: 14,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >     
       {/* eslint-disable-next-line */}
        {menuItems.map((item) =>{
          if(!item.all){
            if((user && user.token) && item.loggedIn && item.title === "Logout"){
              return(
                  <MenuItem key={item.id} onClick={logout}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    {item.title}
                </MenuItem>
              )
            }else if((user && user.token) && item.loggedIn && item.user === "admin" && "admin" === user?.role){
              return(
                <MenuItem key={item.id} onClick={() => history.push(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {item.title}
               </MenuItem>
              )
            }else if((user && user.token) && item.loggedIn && item.user === "subscriber" && "subscriber" === user?.role){
              return(
                <MenuItem key={item.id} onClick={() => history.push(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {item.title}
               </MenuItem>
              )
            }
            else if(!user && !item.loggedIn){
              return(
                <MenuItem key={item.id} onClick={() => history.push(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {item.title}
               </MenuItem>
              )
            }
          }else{
             return (
              <MenuItem key={item.id} onClick={() => history.push(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              {item.title}
            </MenuItem>
            )
          }

         
        })}
      </Menu>
  );
}

export default MenuCard;


