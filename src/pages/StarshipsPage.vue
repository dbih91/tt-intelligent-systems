<script setup lang="ts">
import InputSearch from '../components/InputSearch.vue'
import { ref } from 'vue'
import useApi from '../composibles/useApi.ts'

const api = useApi()

const search = ref<string>()

async function getStarships () {
  try {
    const response = await api.spaceships.get()

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <InputSearch
      v-model="search"
      placeholder="Search Starship"
    />
    StarshipPage
    <button @click="getStarships">
      test
    </button>
  </div>
</template>

<style lang="scss">

</style>
