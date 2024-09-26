<script setup lang="ts">
interface InputSearchProps {
  placeholder: string
}

const modelValue = defineModel('modelValue', { default: '' })

withDefaults(defineProps<InputSearchProps>(), {
  placeholder: 'Search'
})
</script>

<template>
  <label class="tt-input-search">
    <input
      class="tt-input-search__input"
      v-model="modelValue"
      type="search"
      :placeholder="placeholder"
    >
    <span class="tt-input-search__detail">
      🔍
    </span>
  </label>
</template>

<style lang="scss">
.tt-input-search {
  position: relative;
  display: block;

  &__input {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6rem 2.4rem 0.6rem 0.6rem;
    font-size: 1rem;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 250ms;

    &:hover {
      border-color: #646cff;
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  &__detail {
    position: absolute;
    pointer-events: none;
    user-select: none;
    right: 0.6rem;
    top: 0.4rem;
  }
}
</style>
