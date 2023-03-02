import {useToken} from "../../util/hook";
import {useDispatch} from "react-redux";
import {instance} from "../../util/axios/axiosInstance";
import {setCompany} from "../../store/slice/company";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";

export const GetDefaultState = () => {
    const token = useToken()
    const dispatch = useDispatch()

    useEffect(() => {
        (async function getCompanies() {
            const companies = await instance.get('/companies', {headers: token})
            dispatch(setCompany(companies.data))
        })()
    }, [token, dispatch])
    return <Outlet/>
}