<script setup lang="ts">
interface InputSearchProps {
  placeholder: string
}

defineModel('modelValue', { default: '' })

withDefaults(defineProps<InputSearchProps>(), {
  placeholder: 'Search'
})
</script>

<template>
  <label>
    <input
      v-model="modelValue"
      type="search"
      :placeholder="placeholder"
    >
  </label>
</template>

<style lang="scss">

</style>
