export type State = {
    isOpenWindow: boolean
}
const state: State = {
    isOpenWindow: false,
}

export const conditionPath = {
    state,
    mutations:{
        // openWindow( state: State ) {
        //     state.isOpenWindow = true
        // },
    },
    actions:{
        // openWindow ({ commit }: { commit: Function }) {
        //     commit('openWindow')
        // },
    },
    getters: {
        // statusOpenWindow( state: State ) {
        //     return state.isOpenWindow
        // },
    }
}
