<script setup lang="ts">

import UiIcon from "@/components/UiIcon.vue";
import {TypePath} from "@/types/types";
import type {Ref} from 'vue'
import {ref} from 'vue'
import {useStore} from "vuex";

const store = useStore()

interface IProps {
    path: TypePath
}

const props = defineProps<IProps>()

const deletePartTree = () => {
    const pathLength: number = props.path.length
    const fullPath: TypePath = props.path
    let partOfTree: any = store.getters.getFileData
    fullPath.forEach((path, idx) => {
        if (idx < (pathLength - 1)) {
            partOfTree = partOfTree.files[path]
        } else {
            const arrKeyValue: [string, (string | {})][] = Object.entries(partOfTree.files)
            const newArrKeyValue = arrKeyValue.filter(item => {
                return item[0] !== fullPath[pathLength - 1];

            })
            partOfTree.files = Object.fromEntries(newArrKeyValue)
        }
    })
}
let timer: number
const isClick: Ref<boolean> = ref(false)
const clickStart = (dalai: number) => {
    isClick.value = true
    timer = setTimeout(() => {
        deletePartTree()
        isClick.value = false
    }, dalai)
}
const clickStop = () => {
    clearTimeout(timer);
    isClick.value = false
}
</script>
<template>
    <UiIcon
        @mousedown="clickStart(1000)"
        @mouseup="clickStop"
        @mouseout="clickStop"
        icon="trash-bin"
        class="edit-name-file-or-folder__icon edit-name-file-or-folder__icon_click"
        :class="{'timer-del': isClick}"
    />
</template>

<style scoped lang="scss">
.timer-del{
    background: url("@/assets/icons/loading.svg") 100%;
    background-size: cover;
}
</style>