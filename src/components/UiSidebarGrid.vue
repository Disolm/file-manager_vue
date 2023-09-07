<script setup lang="ts">

</script>
<template>
    <div class="sidebar">
      <slot/>
    </div>
</template>
<style scoped lang="scss">
.sidebar{
    grid-area: 1 / 1 / 2 / 2;
    border-right: 1px solid var(--grey-8);
}
</style>