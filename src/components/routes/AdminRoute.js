import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Redirectpage from '../../pages/auth/Redirectpage';
// import LoadingToRedirect fr

const AdminRoute = ({children, ...rest}) => {
    const [ok, setOK] = useState(false);
    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token){
            console.log(user.email);
            if(user.role === "admin"){
                setOK(true);
            } else{
                setOK(true);
            }
        }
         // eslint-disable-next-line
    },[user])

    return ok  ? (
        <Route {...rest} render={() => children} />
    ): (
        <Redirectpage/>
    )
};

export default AdminRoute;