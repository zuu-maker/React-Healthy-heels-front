import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Redirectpage from '../../pages/auth/Redirectpage';

const UserRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({...state}));

    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ): (
        <Redirectpage/>
    )
};

export default UserRoute;