<script setup lang="ts">
defineProps({
  num: {
    type: Number,
    default: 1
  }
})
</script>

<template>
  <div class="item">
    {{ num }}
  </div>
</template>

<style lang="scss">
.item {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border: 1px solid black;
  border-radius: 20%;
  opacity: 100%;
  transition: scale 500ms;
  cursor: pointer;
  &:hover {
    scale: 80%;
  }
  &.changed {
    color: white;
    background-color: red;
    border-color: red;
  }
}
</style>
