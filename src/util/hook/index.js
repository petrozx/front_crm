import {useSelector} from "react-redux";
import {AxiosHeaders} from "axios";

export const useAuth = () => {
    const {isAuth} = useSelector(state => state.auth)
    return isAuth
}

export const useToken = () => {
    const {token} = useSelector(state => state.auth)
    return AxiosHeaders.from({'jwt-token': token})
}

export const useCompanies = () => {
    const {companies} = useSelector(state => state.company)
    return companies
}

export const useRole = () => {
    const {role} = useSelector(state => state.auth)
    return role
}