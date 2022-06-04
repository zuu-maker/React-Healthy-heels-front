import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton, Input, LinearProgress, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import MenuCard from './MenuCard';
import Search from './Search';
import "../../App.css";

const useStyles = makeStyles({
    avatar:{
        fontSize:16,
        width:'5rem',
        fontWeight:'Bold',
        display:'flex',
        backgroundColor:"#e4e8e9",
        color:"#0e5d3b",
        alignItems:'center',
        justifyContent:'center',
        '@media (max-width: 600px)' : {
            width:'3.5rem',
            fontSize:12,
          }
    },
    cart:{
        fontSize:26,
        color: '#0e5d3b',
        cursor: 'pointer',
    },
    search:{
        display:'none',
        fontSize:'1.75rem',
        color: '#0e5d3b',
        cursor: 'pointer',
        '@media (max-width: 600px)' : {
            display:'block'
          }
    },
    input:{
        padding:'0.2rem',
    },
    icon:{
        fontSize:'1.7rem',
        color:'#0e5d3b',
        cursor:'pointer',
        '@media (max-width: 600px)' : {
            fontSize:'1.4rem',
          }
    }
})


function Header() {

    const [showSearch, setShowSearch] = React.useState(false);
    const classes = useStyles()
    let {cart,loader, user, search} = useSelector((state) =>({...state}));
    let history = useHistory();
    const dispatch = useDispatch();
    const { text } = search;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e) => {
        dispatch({
            type:"SEARCH_QUERY",
            payload: {text: e.target.value },
        });
    }

   const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            history.push(`/products/${text}`)
            setShowSearch(false)
        }
    }

    const handleCloseSearch = () => {
        setShowSearch(false)
            dispatch({
                type:"SEARCH_QUERY",
                payload: {text: "" },
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/products/${text}`)
    }

    return (
        <>
        
        <Nav>
        {loader && <LinearProgress color="success" />}
         <Container>
            <ItemContainerLeft>
                    <IconButton
                    onClick={handleClick}
                    size="small"
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

                {
                    showSearch ? 
                    (
                        <IconButton
                        onClick = {handleCloseSearch}
                        size="small" 
                    >
                        <CloseIcon className={classes.search} />
                    </IconButton>
                    ): (
                        <IconButton
                        onClick = {showSearch ? handleSubmit :() => setShowSearch(true)}
                        size="small" 
                    >
                        <SearchIcon className={classes.search} />
                    </IconButton>
                    )
                }
                
                
                <Search/>


           </ItemContainerLeft>    
          {showSearch ? (
              <Input
              color='success'
              className={classes.input}
              type="text"
              placeholder="Search" 
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
               />
          ):(
            <ItemContainerCenter onClick={() => history.push("/")}>
                <Image src="/images/logo.png" alt="" />
             </ItemContainerCenter>
          )}  
            
            <ItemContainerRight>

                
                    <MenuItem onClick={() => history.push("/cart")}>
                        {
                            cart?.length > 0 ?
                            (
                                <Badge color="success" badgeContent={cart?.length} max={9}>
                                    <Tooltip title="Your Cart">                               
                                        <ShoppingCartIcon className={classes.cart} />  
                                    </Tooltip>  
                                </Badge>
                            )
                            :
                            (
                                <Badge color="success" badgeContent={"0"} max={9}>
                                    <Tooltip title="Your Cart">                               
                                        <ShoppingCartIcon className={classes.cart}  />  
                                    </Tooltip>  
                                </Badge>
                            )
                        }
                        
                    </MenuItem>
                
                
                   <MenuItem>
                        {(user && user.token) ? <Avatar className={classes.avatar} variant="square" >
                            {"hey, \n" + user.name.split(' ')[0] }
                        </Avatar> :(
                            <LogIn onClick={() => history.push("/login")}>
                                <LoginIcon className={classes.icon}  />
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
    width: 100vw;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
    height: 64px;
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
 @media (max-width: 600px) {
    font-size: 0.8rem;
}
@media (max-width: 400px) {
    font-size: 0.475rem;
}
`

const Container = styled.div`
   margin:auto ;
    padding: 0 20px;
    max-width: 1366px;
    display:flex;
    color:white;
    align-items:center;
    justify-content:space-between;
    @media (max-width: 600px) {
        justify-content:center;
    }
`

const Image = styled.img`
    height: 3.625rem;
    cursor: pointer;
    object-fit:contain;
    @media (max-width: 600px) {
        height: 3rem;
    }
`

const ItemContainerRight = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    @media (max-width: 600px) {
        margin-top:0.5rem;
    }
`

const ItemContainerCenter = styled.div`
    flex: 1;
    text-align: center;
`

const ItemContainerLeft = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const MenuItem = styled.div`
    font-style: 14px;
    margin-left: 25px;
`

export default Header
