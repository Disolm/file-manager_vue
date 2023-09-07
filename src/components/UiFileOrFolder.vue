<script setup lang="ts">
import UiIcon from "@/components/UiIcon.vue";
import {computed, ref} from 'vue'
import type {IFolderTree} from '@/types/types'
import type {PropType, Ref} from 'vue'

const nameEdited: Ref<boolean> = ref(false)
const props = defineProps({
    directory: Object as PropType<IFolderTree>
})
const mainIcon = computed(() => {
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
</script>

<template>
    <div class="file-or-folder">
        <UiIcon
            :icon="mainIcon"
            class="file-or-folder__icon"
        />
        <div class="file-or-folder__name">
            <slot/>
        </div>
        <UiIcon
            icon="pencil"
            class="file-or-folder__icon file-or-folder__icon_click"
        />
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
        margin-left: 4px;
        margin-right: auto;
        font-size: 20px;
    }

    &__icon {
        height: 90%;
        border-right: 12px;

        &_click {
            cursor: pointer;

            &:hover {
                background: var(--grey);
            }

            &:active {
                background: var(--grey-3);
            }
        }
    }
}
</style>