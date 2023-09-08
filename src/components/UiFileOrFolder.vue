<script setup lang="ts">
import UiIcon from "@/components/UiIcon.vue";
import {computed, ref} from 'vue'
import type {Ref} from 'vue'
import type {IFolderTree, TypePath} from '@/types/types'
import EditNameFileOrFolder from "@/components/EditNameFileOrFolder.vue";
import {useStore} from "vuex";

const store = useStore()

interface IProps {
    directory: IFolderTree,
    path: TypePath
}

const props = defineProps<IProps>()

const nameEdited: Ref<boolean> = ref(false)


const mainIcon = computed<string>(() => {
    if (props.directory?.type === 'directory') {
        if (nameEdited.value) {
            return 'pencil-folder'
        }
        if (Object.keys(props.directory?.files).length) {
            return 'directory'
        }
        return 'directory-empty'
    }
    if (props.directory?.type === 'file') {
        if (nameEdited.value) {
            return 'pencil-file'
        }
        return 'files'
    }
    return 'question-mark'
})
const openOrCloseNameEditor = () => {
    nameEdited.value = !nameEdited.value
}

const deletePartTree = () => {
    const pathLength: number = props.path.length
    const fullPath: TypePath = props.path
    let partOfTree: object = store.getters.getFileData
    fullPath.forEach((path, idx) => {
        if (idx < (pathLength - 1)) {
            partOfTree = partOfTree.files[path]
        } else {
            const arrKeyValue = Object.entries(partOfTree.files)
            const newArrKeyValue = arrKeyValue.filter(item => {
                return item[0] !== fullPath[pathLength - 1];

            })
            partOfTree.files = Object.fromEntries(newArrKeyValue)
        }
    })
}
</script>

<template>
    <div class="file-or-folder">
        <UiIcon
            :icon="mainIcon"
            class="file-or-folder__icon"
        />
        <div class="file-or-folder__name">
            <slot v-if="!nameEdited"/>
            <EditNameFileOrFolder
                v-if="nameEdited"
                :path="path"
                @closeEdit="openOrCloseNameEditor"
                v-clickOutside="openOrCloseNameEditor"
            />
        </div>
        <UiIcon
            @mouseup="openOrCloseNameEditor"
            v-if="!nameEdited"
            icon="pencil"
            class="file-or-folder__icon file-or-folder__icon_click"
        />
        <!-- Приложение можно расширить чтобы создавать папки и файлы-->
        <!--        <UiIcon-->
        <!--            v-if="directory?.type === 'directory'"-->
        <!--            icon="add-file"-->
        <!--            class="file-or-folder__icon file-or-folder__icon_click"-->
        <!--        />-->
        <!--        <UiIcon-->
        <!--            v-if="directory?.type === 'directory'"-->
        <!--            icon="add-folder"-->
        <!--            class="file-or-folder__icon file-or-folder__icon_click"-->
        <!--        />-->
        <UiIcon
            @click="deletePartTree"
            v-if="!nameEdited"
            icon="trash-bin"
            class="file-or-folder__icon file-or-folder__icon_click"
        />
    </div>
</template>

<style scoped lang="scss">
.file-or-folder {
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    &__name {
        width: 100%;
        height: 100%;
        margin-left: 4px;
        margin-right: auto;
        font-size: 20px;
        overflow-x: hidden;
    }

    &__icon {
        height: 90%;
        border-right: 12px;

        &_click {
            @include click-icon;
        }
    }
}
</style>