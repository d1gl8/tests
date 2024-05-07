<script setup lang="ts">
import { getRandom } from '@/utils/helpers'
import hList from '@/components/h-list.vue'
</script>

<template>
  <ul>
    <li v-for="(num, idx) in getRandom({ min: 100, max: 200 })" :key="num + idx">
      <h-list :h_max="getRandom({ min: 10, max: 20 })" :i="idx" />
    </li>
  </ul>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
}
</style>
