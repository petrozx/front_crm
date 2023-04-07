import {instance} from "../util/axios/axiosInstance";

export const Api = {
    addTypeOfWork(body, token) {
        return instance.post('/typeWork/add', body, {
            headers: token
        })
    },
    getTypeOfWork(token) {
        return instance.get('/typeWork/get', {
            headers: token
        })
    },
    removeTypeOfWork(id, token) {
        return instance.delete(`/typeWork/remove/${id}`, {
            headers: token
        })
    },
    saveOrder(data, token) {
        return instance.post('/order/add', data, {
            headers: token
        }).then(r => r.data)
    },
    saveCompany(data, token) {
        return instance.post('/companies/add', data, {
            headers: token
        })
    },
    getCompanies(token) {
        return instance.get('/companies', {
            headers: token
        })
    },
    saveUser(data, token) {
        return instance.post('/user/register', data, {
            headers: token
        })
    },
    getOrders(token) {
        return instance.get("/orders", {
            headers: token
        })
    },
    getUsers(token) {
        return instance.get("/users", {
            headers: token
        })
    },
    allSeen(token) {
        return instance.get("/seen", {
            headers: token
        })
    },
    updateUser(data, token) {
        return instance.put("/user", data, {
            headers: token
        })
    }
}


