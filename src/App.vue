<script setup lang="ts">
import {RouterView} from 'vue-router'
import LayoutBase from "@/components/LayoutBase.vue";
</script>

<template>
    <LayoutBase>
        <RouterView/>
    </LayoutBase>
</template>

<style>

header {
    line-height: 1.5;
    max-height: 100vh;
}


@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
    }
}
</style>
