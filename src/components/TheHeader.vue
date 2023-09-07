<script setup lang="ts">
import MainLogo from "@/components/MainLogo.vue";
import NavBar from "@/components/NavBar.vue";
</script>
<template>
    <div class="header">
        <MainLogo/>
        <NavBar/>
    </div>
</template>

<style scoped>
.header {
    background-color: var(--green);
    min-height: 10vh;
    display: flex;
    flex-direction: column;
}
</style>