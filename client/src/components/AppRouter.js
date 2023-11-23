import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {API_ROUTE, CATALOG_ROUTE} from "../utils/constants";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Api from "./Api";
const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route key={API_ROUTE} path={API_ROUTE} element={<Api name={user.user.firstName}/>}/>
            <Route path="*" element={<Navigate replace to={CATALOG_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;