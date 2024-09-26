<script setup lang="ts">
import InputSearch from '../components/InputSearch.vue'
import { onMounted, ref } from 'vue'
import useApi from '../composibles/useApi.ts'

interface Starship {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: string[],
  films: string[],
  created: string,
  edited: string,
  url: string
}

const api = useApi()

const search = ref<string>()

const loading = ref(false)
const starships = ref<Starship[]>([])

async function getStarships () {
  loading.value = true
  try {
    const response = await api.spaceships.get()

    const data = await response.json()

    starships.value = data.results
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getStarships()
})
</script>

<template>
  <div class="tt-starships-page">
    <h2>Starships</h2>
    <InputSearch
      v-model="search"
      placeholder="Search Starship"
    />
    <button v-if="loading" disabled>
      Loading
    </button>
    <div v-else class="tt-starships-list">
      <button
        v-for="starship of starships"
        :key="starship.name"
        class="tt-starships-list__item"
      >
        {{ starship.name }}
      </button>
    </div>
    <div class="tt-starships-pagination">
      <button :disabled="loading">
        Previous
      </button>
      <button :disabled="loading">
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.tt-starships-page {
  display: flex;
  flex-flow: column;
  gap: 16px;
  max-width: 512px;
  margin-inline: auto;
}

.tt-starships-list {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;

  h2 {
    display: block;
    margin-bottom: 0.5rem;
  }

  &__item {
    display: flex;
    align-items: center;
    width: 512px;
    max-width: 100%;
  }
}

.tt-starships-pagination {
  display: flex;
  gap: 8px;

  button {
    width: 50%;
  }
}
</style>
