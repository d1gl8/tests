<script lang="ts" setup>
  provide("lang", ref("en"));
</script>

<template>
  <AppHeader />
  <main>
    <slot />
  </main>
</template>

<style lang="scss">
  main {
    padding: 10px var(--px) 40px;
  }
</style>
