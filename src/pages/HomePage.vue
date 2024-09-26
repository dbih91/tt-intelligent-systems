<script setup lang="ts">

</script>

<template>
  <div class="tt-home-page">
    <h1>
      Starships Control Panel Application
    </h1>
    <p>
      Test task
    </p>
    <p>
      Author Petrov Danil
    </p>
    <a
      href="https://github.com/dbih91/tt-intelligent-systems"
      target="_black"
    >
      Github Page
    </a>
    <router-view to="/starships">
      <button>
        Starships
      </button>
    </router-view>
  </div>
</template>

<style lang="scss">
.tt-home-page {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  align-items: center;

  h1 {
    margin-bottom: 1rem;
  }
}
</style>
