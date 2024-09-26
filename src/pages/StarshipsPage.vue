<script setup lang="ts">
import InputSearch from '../components/InputSearch.vue'
import { computed, onMounted, ref, watch } from 'vue'
import useApi from '../composibles/useApi.ts'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from '../utils/debounce.ts'
import extractStarshipIdFromUrl from '../utils/extractStarshipIdFromUrl.ts'
import { Starship } from '../api/types.ts'

const api = useApi()
const route = useRoute()
const router = useRouter()

const search = ref('')

const loading = ref(true)
const starships = ref<Starship[]>([])
const countStarships = ref(0)
const totalStarships = ref(0)
const pages = ref(0)
const page = computed(() => {
  const page = +route.params.pageId

  return route.params.pageId === '' || isNaN(page) ? 1 : page
})
const hasPreviousPage = ref(false)
const hasNextPage = ref(false)

const searchSend = ref('')
const searchStarships = debounce(() => {
  clearData()
  getStarships()
}, 250)

watch(search, () => {
  if (searchSend.value !== search.value) {
    if (page.value !== 1) {
      return goTo(1)
    }
    searchStarships()
  }
})

async function getStarships () {
  loading.value = true
  try {
    searchSend.value = search.value
    const response = await api.starships.get(page.value, searchSend.value)

    const data = await response.json()

    starships.value = data.results || []
    countStarships.value = starships.value.length
    totalStarships.value = data.count
    pages.value = Math.ceil(totalStarships.value / 10)
    hasNextPage.value = !!data.next
    hasPreviousPage.value = !!data.previous
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function clearData () {
  starships.value = []
  countStarships.value = 10
  hasNextPage.value = false
  hasPreviousPage.value = false
  loading.value = true
}

function goTo (newPage: number) {
  clearData()
  router.push({
    name: 'Starships',
    params: {
      pageId: (newPage).toString()
    }
  }).then(() => {
    getStarships()
  })
}

function previous () {
  goTo(page.value - 1)
}

function next () {
  goTo(page.value + 1)
}

function goToStarship (starshipUrl: string) {
  router.push({
    name: 'Starship',
    params: {
      starshipId: extractStarshipIdFromUrl(starshipUrl)
    }
  })
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
    <div class="tt-starships-list">
      <button
        v-if="loading || starships.length === 0"
        class="tt-starships-list__item"
        disabled
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Nothing was found :(</span>
        <sub>-</sub>
      </button>
      <button
        v-for="starship of starships"
        :key="starship.name"
        class="tt-starships-list__item"
        @click="goToStarship(starship.url)"
      >
        <span>{{ starship.name }}</span>
        <sub>{{ starship.model }}</sub>
      </button>
      <button
        v-for="index in Math.max(10 - starships.length - +(loading || starships.length === 0), 0)"
        :key="index"
        class="tt-starships-list__item"
        disabled
      >
        <span>-</span>
        <sub>-</sub>
      </button>
    </div>
    <span class="tt-starships-list__info">
        Showing {{ page * 10 - 9 }} - {{ (page - 1) * 10 + countStarships }} of {{ totalStarships }} results<br>
        Page {{ page }} of {{ pages }}
      </span>
    <div class="tt-starships-pagination">
      <button
        :disabled="loading || !hasPreviousPage"
        @click="previous"
      >
        Previous
      </button>
      <button
        :disabled="loading || !hasNextPage"
        @click="next"
      >
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
    flex-flow: column;
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
