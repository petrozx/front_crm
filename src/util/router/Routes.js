import React from "react";
import Header from "../../modules/Header";
import PrivateRoute from "./privateRoute";
import Index from "../../modules/Index";
import UserAdd from "../../modules/UserAdd";
import Company from "../../modules/Company";
import CompanyAdd from "../../modules/CompanyAdd";
import OrderAdd from "../../modules/OrderAdd";
import Login from "../../modules/Login";
import {GetDefaultState} from "../../modules/getDefaultState";
import Orders from "../../modules/orders";
import {TypeOfWorkAdd} from "../../modules/typeOfWork/add";

export const Routes = [
    {
        element: <PrivateRoute />,
        children:
        [
            {
                element: <GetDefaultState/>,
                children:
                [
                    {
                        element: <Header/>,
                        children:
                        [
                            {
                                path: "/",
                                element: <Index/>,
                            },
                            {
                                path: "/user/add",
                                element: <UserAdd/>,
                            },
                            {
                                path: "/company",
                                element: <Company/>,
                            },
                            {
                                path: "/company/add",
                                element: <CompanyAdd/>
                            },
                            {
                                path: "/order/add",
                                element: <OrderAdd/>,
                            },
                            {
                                path: "/orders",
                                element: <Orders/>
                            },
                            {
                                path: "/typeWork/add",
                                element: <TypeOfWorkAdd/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },

];