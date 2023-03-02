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
    }
}


