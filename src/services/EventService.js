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
    getEvents(){
        return apiClient.get('/events')
    },
    getEvent(id){
        return apiClient.get(`/events/${id}`)
    }

}

