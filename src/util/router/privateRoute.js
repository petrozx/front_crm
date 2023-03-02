import {useAuth} from "../hook";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {instance} from "../axios/axiosInstance";
import {useDispatch} from "react-redux";
import {login, setRole} from "../../store/slice/auth";
import {AxiosHeaders} from "axios";
import {LinearProgress} from "@mui/material";
export default function PrivateRoute() {
    const [awaitResult, setAwaitResult] = useState(false)
    const auth = useAuth()
    const location = useLocation()
    const tokenFromLocaleStorage = localStorage.getItem('jwt-token')
    const dispatch = useDispatch()
    useEffect(() => {
        (async function() {
            if (tokenFromLocaleStorage && !auth) {
                    const header = AxiosHeaders.from({'jwt-token': tokenFromLocaleStorage})
                    await instance.get('/verify',
                        {headers: header}
                    )
                        .then(resp => {
                            if (resp.status === 200) {
                                dispatch(login(tokenFromLocaleStorage))
                                dispatch(setRole(resp.data.role))
                            }
                        })
                        .catch(_ => localStorage.removeItem('jwt-token'))
            }
            setAwaitResult(true)
        })()
    }, [auth, awaitResult, dispatch, tokenFromLocaleStorage])


    return awaitResult ? (auth ? <Outlet /> : <Navigate to={'/login'} replace state={{from: location}}/>) : <LinearProgress />
}