<script setup lang="ts">
import UiContainer from "@/components/UiContainer.vue";
// defineProps(['error'])
/*
 в nuxt3 это работает, а в vue3 нет (((
 а может и работает, но я ещё не разобрался. В документации такого нет.
*/
</script>
<template>
    <div class="not-found">
        <UiContainer>
            <h2 class="not-found__title">
<!--                <span class="not-found__status-text">Message: {{ error.message }}</span>-->
                <span class="not-found__status-text">Страница не найдена</span>
<!--                <span class="not-found__status-code">Status code: {{ error.statusCode }}</span>-->
                <span class="not-found__status-code">404</span>
            </h2>
        </UiContainer>
    </div>
</template>

<style scoped lang="scss">
.not-found{
    padding: 100px 0;
    &__title {
        font-family: Nunito, sans-serif;
        font-weight: 700;
        font-size: 52px;
        line-height: 1.2;
        text-align: center;
        color: var(--body-color);
    }
    &__status-code {
        display: block;
        font-size: 144px;
    }

    @media all and (max-width: 767px) {
        &__title {
            font-size: 36px;
        }

        &__status-code {
            font-size: 108px;
        }
    }
}
</style>