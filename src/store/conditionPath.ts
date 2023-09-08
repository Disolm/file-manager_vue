import axios from 'axios';
import {klona} from "klona";

export type State = {
    filesTree: object | null | undefined,
    finallyRequest: boolean
}
const state: State = {
    filesTree: null,
    finallyRequest: false
}

export const conditionPath = {
    state,
    mutations: {
        setFileData(state: State, fileData: object) {
            state.filesTree = klona(fileData)
        },
    },
    actions: {
        async fetchFile({commit}: { commit: Function }) {
            const baseURL: string = "./src/api/json/files-tree.json";
            state.finallyRequest = false
            await axios
                .get(baseURL)
                .then(response => {
                    commit("setFileData", response.data);
                })
                .catch(e => {
                    commit("setFileData", undefined);
                    console.error(e);
                })
                .finally(() => state.finallyRequest = true)
        },


    },
    getters: {
        //так как backend отсутствует, то и отправлять изменённые данные не нет возможности.
        sendingFileToServer(state: State) {
            const serverURL: string = "http://localhost:8081/";
            axios.post(serverURL, {
                body: state.filesTree
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getFileData(state: State) {
            return state.filesTree
        },
    }
}
