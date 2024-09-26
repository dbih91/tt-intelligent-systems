<script setup lang="ts">
</script>

<template>
  <header>
    <router-link
      class="logo"
      to="/"
      >
      <img
        src="/logo.png"
        alt="TT Starships logo"
      >
      TT Starships
    </router-link>
    <a
      class="git-link"
      href="https://github.com/dbih91/tt-intelligent-systems"
      target="_blank"
    >
      <img
        src="/github-mark-white.svg"
        alt="Github logo"
      />
    </a>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
</style>

