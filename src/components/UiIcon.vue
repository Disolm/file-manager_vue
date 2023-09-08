<script setup lang="ts">
import addFolder from '../assets/icons/add-folder-svgrepo-com.svg';
import addFile from '../assets/icons/add-file-svgrepo-com.svg';
import checkMark from '../assets/icons/check-mark-svgrepo-com.svg';
import cross from '../assets/icons/cross-svgrepo-com.svg';
import directory from '../assets/icons/directory-svgrepo-com.svg';
import directoryEmpty from '../assets/icons/file-directory-svgrepo-com.svg';
import ellipsis from '../assets/icons/ellipsis-v-svgrepo-com.svg';
import files from '../assets/icons/files-by-google-svgrepo-com.svg';
import folderTree from '../assets/icons/folder-tree-icon.svg';
import pencilFile from '../assets/icons/pencil-file-svgrepo-com.svg';
import pencilFolder from '../assets/icons/pencil-folder-svgrepo-com.svg';
import pencil from '../assets/icons/pencil-svgrepo-com.svg';
import trashBin from '../assets/icons/trash-bin-trash-svgrepo-com.svg';
import questionMark from '../assets/icons/question-mark-svgrepo-com.svg';
import {computed} from "vue";
interface Icons {
    [key: string]: string;
}
const icons: Icons = {
    'add-folder': addFolder,
    'add-file': addFile,
    'check-mark': checkMark,
    'cross': cross,
    'directory': directory,
    'directory-empty': directoryEmpty,
    'ellipsis': ellipsis,
    'files': files,
    'folder-tree': folderTree,
    'pencil-file': pencilFile,
    'pencil-folder': pencilFolder,
    'pencil': pencil,
    'trash-bin': trashBin,
    'question-mark': questionMark,
};
const props = defineProps<{
    icon: String
}>()

const iconSrc = computed<string>(() => {
    return icons[props.icon];
})
</script>

<template>
    <img class="icon" :alt="icon" :src="iconSrc"/>
</template>

<style scoped lang="scss">
.icon {
    display: block;
}
</style>