import { observer } from 'mobx-react-lite';
import React, { ComponentType } from 'react';
import { Redirect, RouteComponentProps, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import { useStore } from '../stores/store';

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
 }

const PrivateRoute = ({component: Component, ...rest} : Props) => {
    const {userStore : {isLoggedIn}} = useStore();
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props}/> : <Redirect to='/'/>}
        />
    )
}


export default observer(PrivateRoute);