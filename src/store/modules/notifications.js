export const namespaced = true
export const state = {
    errorMessage: null,
    successMessage: null
}

export const actions = {
    modifyErrorMsg({commit},err){
        commit('MODIFY_ERROR_MSG', err)
      },
}

export const mutations = {
    MODIFY_ERROR_MSG(state,msg){
        state.errorMessage = msg
    },
}
