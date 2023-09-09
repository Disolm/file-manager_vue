<script setup lang="ts">
import UiInput from "@/components/UiInput.vue";
import type {IFolderTree, TypePath} from "@/types/types";
import {computed} from 'vue'
import {useStore} from "vuex";
import {klona} from "klona";
import UiIcon from "@/components/UiIcon.vue";

const store = useStore()

interface IProps {
    path: TypePath
}

const props = defineProps<IProps>()
const emit = defineEmits(['closeEdit'])

const filesTree: IFolderTree = klona(store.getters.getFileData)
const nameOld:string = props.path[props.path.length - 1]
let nameNew:string = nameOld

const nameCurrent = computed<string>({
    get() {
        return props.path[props.path.length - 1]
    },
    set(newValue) {
        nameNew = newValue
    }
})
const saveChangeName = () => {
    const pathLength: number = props.path.length
    const fullPath: TypePath = props.path
    let partOfTree: any = filesTree
    fullPath.forEach((path, idx) => {
        if (idx < (pathLength - 1)) {
            partOfTree = partOfTree.files[path]
        } else {
            const arrKeyValue: [string, (string | {})][] = Object.entries(partOfTree.files)
            const newArrKeyValue = arrKeyValue.map(item => {
                if(item[0] === nameOld) {
                    item.shift()
                    item.unshift(nameNew)
                }
                return item
            })
            if (!nameMatchingCheck()) {
                partOfTree.files = Object.fromEntries(newArrKeyValue)
            }
        }
    })
    store.commit('setFileData', filesTree)
    emit('closeEdit')
}
const nameMatchingCheck = () => {
    let partOfTree: any = klona(filesTree)
    const fullPath: TypePath = props.path
    return fullPath.some((path, idx) => {
        if (idx < (fullPath.length - 1)) {
            partOfTree = partOfTree.files[path]
        } else if (idx === (fullPath.length - 1)) {
            return !!partOfTree.files[nameNew]
        }
    })
}
const cancelChangeName = () => {
    emit('closeEdit')
}

</script>
<template>
    <div class="edit-name-file-or-folder">
        <UiInput
            v-model="nameCurrent"
            placeholder="new name"
            class="edit-name-file-or-folder__input"
        />
        <UiIcon
            @click="saveChangeName"
            icon="check-mark"
            class="edit-name-file-or-folder__icon edit-name-file-or-folder__icon_click"
        />
        <UiIcon
            @click="cancelChangeName"
            icon="cross"
            class="edit-name-file-or-folder__icon edit-name-file-or-folder__icon_click"
        />
    </div>

</template>

<style lang="scss">
.edit-name-file-or-folder {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;

    &__input {
        margin-right: auto;
    }

    &__icon {
        height: 90%;

        &_click {
            @include click-icon;
        }
    }
}
</style>