import Axios from 'axios'

const apiClient = Axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers:{
        Accetp: 'application/json',
        'Content-tye': 'application/json'
    }
})

export default {
    getEvents(pagination){
        return apiClient.get(`/events?_limit=${pagination.perPage}&_page=${pagination.page}`)
    },
    getEvent(id){
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event){
        return apiClient.post('/events',event)
    }

}

