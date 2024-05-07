<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRandom } from '@/utils/helpers'
import item from '@/components/item.vue'

const props = defineProps({
  h_max: {
    type: Number,
    required: true
  }
})

const h_array = ref(
  Array(props.h_max)
    .fill(0)
    .map(() => getRandom())
)

const changed_idx = ref(-1)
const is_change_on = ref(false)
setInterval(async () => {
  changed_idx.value = await new Promise((resolve) => {
    resolve(getRandom({ min: 0, max: props.h_max - 1 }))
  })
  if (is_change_on.value) h_array.value[changed_idx.value] = getRandom()
  else changed_idx.value = -1
}, 1000)

const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting }) => {
    is_change_on.value = isIntersecting ? true : false
  })
})

const list = ref(null)
onMounted(() => {
  observer.observe(list.value)
})
</script>

<template>
  <ul class="h-list" ref="list">
    <li v-for="(num, h_idx) in h_array" :key="h_array[h_idx]">
      <item :num="num" :class="{ changed: changed_idx === h_idx }" />
    </li>
  </ul>
</template>

<style lang="scss">
.h-list {
  display: flex;
  gap: 10px;
  margin: 10px;
}
</style>
