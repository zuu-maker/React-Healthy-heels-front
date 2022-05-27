import React from 'react';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
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
  icon:(<LocalOfferIcon />)
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
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}

        {menuItems.map((item) => (
          <MenuItem key={item.id} onClick={() => history.push(item.path)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          {item.title}
        </MenuItem>
        ))}
        
        
        {user && user.token && (
          <>
          {user && user.role === 'admin' ? 
          (
            <>
              <MenuItem key={1} onClick={() => history.push("/admin/dashboard")}>
                  <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                      Dashboard
              </MenuItem>
              <MenuItem key={2} onClick={() => history.push("/user/history")}>
                  <ListItemIcon>
                      <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>
                    Orders
              </MenuItem>
            </>
          )
          :
          (
          <MenuItem key={2} onClick={() => history.push("/user/history")}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>
          )}
            <MenuItem key={3} onClick={() => history.push("/products")}>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            Cart
          </MenuItem>
           <Divider />
           {/* <MenuItem>
             <ListItemIcon>
               <Settings fontSize="small" />
             </ListItemIcon>
             Password Reset
           </MenuItem>
           <MenuItem onClick={() => history.push("/products")}>
             <ListItemIcon>
               <AccountBoxIcon fontSize="small" />
             </ListItemIcon>
             Account
           </MenuItem> */}
           <MenuItem key={4} onClick={logout}>
             <ListItemIcon>
               <Logout fontSize="small" />
             </ListItemIcon>
             Logout
           </MenuItem>
          </>
          
       
      )} 
      {!user && (
        <MenuItem key={5} onClick={() => history.push("/login")}>
        <ListItemIcon>
          <LoginIcon fontSize="small" />
        </ListItemIcon>
        Sign In
      </MenuItem>
      )} 
      </Menu>
  );
}

export default MenuCard;
