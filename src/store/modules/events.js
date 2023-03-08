import EventService from '@/services/EventService'
export const namespaced = true

export const state = {
    events:[],
    lengthEvents: 0,
    event:{},
    perPage: 3
}

export const mutations = {
    ADD_EVENT(state,event){
        state.events.push(event)
      },
      
      SET_EVENTS(state,events){
        state.events = events
      },
      SET_LENGTH_EVENTS(state, lengthEvents){
        state.lengthEvents = lengthEvents
      },
      SET_EVENT(state,event){
        state.event = event
      }
}

export const actions = {
    async addEvent({commit, dispatch},event){
        await EventService.postEvent(event)
        .then( res => {
          if(res.status==200){
            commit('ADD_EVENT',event)
          }})
        .catch( err => {
          dispatch('modifyErrorMsg', err.message)
        })
      },
      async fetchEvents({commit, dispatch,state},page){
        return await EventService.getEvents({
          perPage:state.perPage,
          page})
          .then( res => {
            if(res.data.length > 0){
              commit('SET_EVENTS',res.data)
              commit('SET_LENGTH_EVENTS',parseInt(res.headers['x-total-count']))
            }
          })
          .catch( err => {
            console.log(err.message)
            dispatch('notifications/modifyErrorMsg', err.message, {root:true})
          })
      },
      async fetchEvent({commit, dispatch}, id){
        try {
          const res = await EventService.getEvent(id)
          if (res.data) {
            commit('SET_EVENT', res.data)
            return res.data
          }
        } catch (err) {
          dispatch('modifyErrorMsg', err.message)
        }
      }
}