import { createStore } from "vuex";
import { conditionPath } from "@/store/conditionPath";

export const store = createStore({
    modules: {
        conditionPath: conditionPath,
    }
})