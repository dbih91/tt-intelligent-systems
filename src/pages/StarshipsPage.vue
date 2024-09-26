<script setup lang="ts">
import InputSearch from '../components/InputSearch.vue'
import { ref } from 'vue'

const search = ref<string>()
</script>

<template>
  <div>
    <InputSearch
      v-model="search"
      placeholder="Search Starship"
    />
    StarshipPage
  </div>
</template>

<style lang="scss">

</style>
