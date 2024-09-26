<script setup lang="ts">
import InputSearch from '../components/InputSearch.vue'
import { computed, onMounted, ref } from 'vue'
import useApi from '../composibles/useApi.ts'
import { useRoute } from 'vue-router'

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
const route = useRoute()

const search = ref<string>()

const loading = ref(false)
const starships = ref<Starship[]>([])
const countStarships = ref(0)
const totalStarships = ref(0)
const pages = ref(0)
const page = computed(() => {
  const page = +route.params.pageId

  return route.params.pageId === '' || isNaN(page) ? 1 : page
})

async function getStarships () {
  loading.value = true
  try {
    const response = await api.spaceships.get(page.value)

    const data = await response.json()

    starships.value = data.results
    countStarships.value = starships.value.length
    totalStarships.value = data.count
    pages.value = Math.ceil(totalStarships.value / countStarships.value)

    console.log(data)
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
    <template v-else>
      <div class="tt-starships-list">
        <button
          v-for="starship of starships"
          :key="starship.name"
          class="tt-starships-list__item"
        >
          {{ starship.name }}
        </button>
      </div>
      <span
        class="tt-starships-list__info"
        v-if="!loading"
      >
        Showing {{ page * countStarships + 1 }} - {{ countStarships }} of {{ totalStarships }} results<br>
        Page {{ page }} of {{ pages }}
      </span>
    </template>

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

  &__info {
    text-align: start;
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
