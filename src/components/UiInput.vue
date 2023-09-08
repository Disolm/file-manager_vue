<script lang="ts">
export default {

    name: 'UiInput',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    methods: {
        focus() {
            (this.$refs.input as HTMLInputElement).focus();
        },
    },
    mounted() {
        this.focus()
    }
};
</script>
<template>
    <div
        class="input"
    >
        <input
            ref="input"
            class="input__input"
            :value="modelValue"
            v-bind="$attrs"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value )"
            :placeholder="placeholder"
        />
    </div>
</template>

<style scoped lang="scss">

.input {
    width: 100%;
    &__input {
        width: 100%;
        min-width: 0;
        max-width: 300px;
        background: var(--green-light);
        color: var(--grey-8);
        &::placeholder{
            color: var(--blue-light);
            font-size: .9em;
        }
    }
}
</style>