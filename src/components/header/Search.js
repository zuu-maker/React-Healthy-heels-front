import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'

function Search() {

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({...state}));
    const { text } = search;

    const history = useHistory()

    const handleChange = (e) => {
        dispatch({
            type:"SEARCH_QUERY",
            payload: {text: e.target.value },
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/products/${text}`)
    }

  return (
        <SearchContainer>
            <SearchIcon onClick={handleSubmit} className="mainColor" fontSize="medium" />  
            <Input
             type="search" 
             placeholder="Search" 
             value={text}
             onChange={handleChange}
             />
        </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
    border-radius: 50px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 5px;
    background-color:#ffffff;
    @media (max-width: 424px) {
        margin-left: 0px;
    }
`

const Input = styled.input`
    border: none;
    outline:none !important;
`