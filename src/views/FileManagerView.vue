<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
import {RouterView} from "vue-router";
import UiSidebarGrid from "@/components/UiSidebarGrid.vue";
import UiContentGrid from "@/components/UiContentGrid.vue";
import FileTrack from "@/components/FileTrack.vue";
import type {IFolderTree} from "@/types/types";
import UiAlert from "@/components/UiAlert.vue";
import { useStore } from 'vuex'

const store = useStore()
const loading:Ref<boolean> = ref(true);
const filesTree:Ref<IFolderTree | null> = ref(null);
(async () => {
    await store.dispatch('fetchFile')
    filesTree.value = await store.getters.getFileData
    loading.value = false
})()

</script>

<template>
    <div class="file-manager">
        <UiSidebarGrid>
            <UiAlert v-if="loading">загрузка</UiAlert>
            <UiAlert v-if="!loading && !filesTree"/>
            <FileTrack
                v-if="!!filesTree"
                :data-files="filesTree"
            />
        </UiSidebarGrid>
        <UiContentGrid>
            <RouterView />
        </UiContentGrid>
    </div>
</template>

<style scoped lang="scss">
.file-manager{
    flex: 1 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    //grid-column-gap: 4px;
}
</style>