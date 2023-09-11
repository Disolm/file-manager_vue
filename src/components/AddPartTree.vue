<script setup lang="ts">
import UiIcon from "@/components/UiIcon.vue";
import type {TypePath} from "@/types/types";
import {useStore} from "vuex";
import {klona} from "klona";
import {generateId} from "@/plugins/generatorId";

const store = useStore()

interface IProps {
    path: TypePath
}

const props = defineProps<IProps>()
const newFolder: object = {
    "id": String(generateId()),
    "type": "directory",
    "files": {}
}
const nameNewFolder = 'New folder'
const addPartTree = () => {
    const pathLength: number = props.path.length
    const fullPath: TypePath = props.path
    let partOfTree: any = store.getters.getFileData
    fullPath.forEach((path, idx) => {
        if (idx < (pathLength - 1)) {
            partOfTree = partOfTree.files[path]
        } else {
            partOfTree.files[path].files = {...klona(partOfTree.files[path].files), [nameNewFolder]: newFolder}
        }
    })
}
</script>


<template>
    <div class="add-part-tree">
        <UiIcon
            @click="addPartTree"
            icon="add-folder"
            class="add-part-tree__icon add-part-tree__icon_click"
        />
    </div>
</template>

<style scoped lang="scss">
.add-part-tree {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    &__icon {
        @include icon-edit
    }
}
</style>