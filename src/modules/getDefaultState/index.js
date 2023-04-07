import {useToken} from "../../util/hook";
import {useDispatch} from "react-redux";
import {setCompany} from "../../store/slice/company";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Api} from "../../api";

export const GetDefaultState = () => {
    const token = useToken()
    const dispatch = useDispatch()
    useEffect(() => {
        Api.getCompanies(token).then(r => dispatch(setCompany(r.data)))
    }, [token, dispatch])
    return <Outlet/>
}