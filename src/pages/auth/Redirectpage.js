import React,{useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import styled from 'styled-components'

const Redirectpage  = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() =>{
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        },1000)

        count === 0 && history.push("/");

        return () => clearInterval(interval);
         // eslint-disable-next-line
    },[count])

    return (
        <Container>
            <p>redirecting you in {count} seconds</p>
        </Container>
    )
}

export default Redirectpage;

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-Top: 20%;
`