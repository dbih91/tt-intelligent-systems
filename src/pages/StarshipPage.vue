<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Starship } from '../api/types.ts'
import { useRoute } from 'vue-router'
import useApi from '../composibles/useApi.ts'

const route = useRoute()
const api = useApi()

const loading = ref(true)
const starship = ref<Starship | null>(null)
const starshipId = computed(() => {
  const id = +route.params.starshipId

  return route.params.starshipId === '' || isNaN(id) ? 0 : id
})

async function getStarship () {
  loading.value = true
  try {
    const response = await api.starship.get(starshipId.value)

    starship.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => getStarship())
</script>

<template>
  <div class="tt-starship-page">
    <h2>
      {{ starship?.name || 'Loading...' }}
    </h2>
    <table
      v-if="starship"
      class="tt-starship-table"
    >
      <tbody>
        <tr><th>Name</th><td>{{ starship.name }}</td></tr>
        <tr><th>Model</th><td>{{ starship.model }}</td></tr>
        <tr><th>Manufacturer</th><td>{{ starship.manufacturer }}</td></tr>
        <tr><th>Cost</th><td>{{ starship.cost_in_credits }} Credits</td></tr>
        <tr><th>Length</th><td>{{ starship.length }}</td></tr>
        <tr><th>Max Atmospheric Speed</th><td>{{ starship.max_atmosphering_speed }}</td></tr>
        <tr><th>Crew</th><td>{{ starship.crew }}</td></tr>
        <tr><th>Passengers</th><td>{{ starship.passengers }}</td></tr>
        <tr><th>Cargo Capacity</th><td>{{ starship.cargo_capacity }}</td></tr>
        <tr><th>Consumables</th><td>{{ starship.consumables }}</td></tr>
        <tr><th>Hyperdrive Rating</th><td>{{ starship.hyperdrive_rating }}</td></tr>
        <tr><th>MGLT</th><td>{{ starship.MGLT }}</td></tr>
        <tr><th>Starship Class</th><td>{{ starship.starship_class }}</td></tr>
        <tr><th>Pilots</th><td>
          <span
            v-for="pilot of starship.pilots"
            :key="pilot"
          >
            {{ pilot }}
          </span>
          <span v-if="starship.pilots.length === 0">
            No Pilots
          </span>
        </td></tr>
        <tr><th>Films</th><td>
          <a
            v-for="film of starship.films"
            :key="film"
            :href="film"
          >
            {{ film }}<br>
          </a>
        </td></tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.tt-starship-page {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;
}

.tt-starship-table {
  text-align: left;
  border-collapse: collapse;

  tr:nth-child(even) {
    background-color: #00000040;
  }

  td,
  th {
    padding: 0.3rem 0.6rem;
    border: 1px solid white;
  }
}
</style>
