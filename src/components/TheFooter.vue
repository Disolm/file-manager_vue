<script setup lang="ts">
import UiContainer from "@/components/UiContainer.vue";
</script>
<template>
    <footer class="footer">
        <UiContainer>&copy; Глебский Дмитрий 2023 - {{ new Date().getFullYear() }}</UiContainer>
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    background: var(--blue-light);
    padding: 12px 0;
    text-align: center;
}
</style>