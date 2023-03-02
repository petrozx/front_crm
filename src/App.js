import React from "react";
import {Routes} from "./util/router/Routes";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(Routes);

export default function App() {
    return <RouterProvider router={router} />
}