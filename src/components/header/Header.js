import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton, LinearProgress, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from '@mui/material';
import "../../App.css"

import { useHistory } from "react-router-dom";


import {useSelector} from 'react-redux'
import MenuCard from './MenuCard';
import Search from './Search';


function Header() {

    // let dispatch = useDispatch();
    let {cart,loader, user} = useSelector((state) =>({...state}));
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        
        <Nav>
        {loader && <LinearProgress color="success" />}
         <Container>
            <ItemContainerLeft>
            <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <MenuIcon className="mainColor" fontSize="large" />
          </IconButton>
          <MenuCard
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          />
           <Search/>
                
            </ItemContainerLeft>
            <ItemContainerCenter onClick={() => history.push("/")}>
                <Image src="/images/logo.png" alt="" />
            </ItemContainerCenter>
            <ItemContainerRight>

                {user && user.token && (
                    <MenuItem onClick={() => history.push("/cart")}>
                        {
                            cart?.length > 0 ?
                            (
                                <Badge color="success" badgeContent={cart?.length} max={9}>
                                    <Tooltip title="Your Cart">                               
                                        <ShoppingCartIcon className="mainColor" fontSize="large" />  
                                    </Tooltip>  
                                </Badge>
                            )
                            :
                            (
                                <Badge color="success" badgeContent={"0"} max={9}>
                                    <Tooltip title="Your Cart">                               
                                        <ShoppingCartIcon className="mainColor" fontSize="large" />  
                                    </Tooltip>  
                                </Badge>
                            )
                        }
                        
                    </MenuItem>
                )}
                
                   <MenuItem>
                        {(user && user.token) ? <Avatar variant="square"  style={{backgroundColor:"#e4e8e9",color:"#0e5d3b", fontSize:16,display:'flex', justifyContent:'center',alignItems:'center', width:'4rem',fontWeight:'bold' }}>
                            {"hey, " + user.name.split(' ')[0] }
                        </Avatar> :(
                            <LogIn onClick={() => history.push("/login")}>
                                <LoginIcon className="mainColor" />
                                <Text >Sign In</Text>
                            </LogIn>
                            
                        ) }
                    </MenuItem>

                
            </ItemContainerRight>
         </Container>
        </Nav>
        </>
    )
}

const Nav = styled.nav`
 /* max-width: 1366px; */
    width: 100vw;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
    height: 64px;
    /* width:100%; */
    /* display: flex;
    align-items: center;
    justify-content: center; */
    /* position: fixed;
    top: 0;
    left: 0; */
    /* z-index:1000; */
    /* background-color:#EBF4FA; */
    background-color:#e4e8e9;
    z-index:1000;
    position:fixed;
    left:0;
    top:0;
    right:0;
`

const LogIn = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
` 

const Text = styled.h4`
 font-size: 1rem;
 color: #0e5d3b;
`

const Container = styled.div`
   margin:auto ;
    padding: 0 20px;
    /* background-color:#e4e8e9; */
    max-width: 1366px;
    display:flex;
    color:white;
    align-items:center;
    justify-content:space-between;
    @media (max-width: 424px) {
        justify-content:center;
    }
`

const Image = styled.img`
    height: 3.625rem;
    cursor: pointer;
    object-fit:contain;
    @media (max-width: 424px) {
        height: 3rem;
    }
`

const ItemContainerRight = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    @media (max-width: 424px) {
        display:none;
    }
    /* justify-content: space-between; */
    /* width: 140px;
    padding-right: 4px; */
`

const ItemContainerCenter = styled.div`
    flex: 1;
    text-align: center;
`

const ItemContainerLeft = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    /* width: 60px; */
`

const MenuItem = styled.div`
    font-style: 14px;
    margin-left: 25px;
`

export default Header
