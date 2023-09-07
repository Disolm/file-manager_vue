<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
<template>
    <div class="wrapper">
        <TheHeader/>
        <main class="main">
            <slot/>
        </main>
        <TheFooter/>
    </div>
</template>

<style scoped>
.wrapper {
    background-color: var(--grey-light);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main {
    flex: 1 0 auto;
    display: flex;
}
</style>
