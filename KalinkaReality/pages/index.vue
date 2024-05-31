<script lang="ts" setup>
  import useApi from "@/composables/useApi";

  let params, load;

  if (process.client) {
    params = reactive({
      _start: 0,
      _limit: 8,
    });

    load = (idx: number) => {
      if (params._start > idx) return;
      params._start += params._limit;
    };
  }

  const objects = ref([]);
  await useApi("/objects", {
    params,
    transform: (ctx: []) => {
      objects.value.push(...ctx);
    },
  });
  onMounted(() => {
    process.server && console.log("server", objects.value.length);
    process.client && console.log("client", objects.value.length);
  });
</script>

<template>
  <ul>
    <li
      v-for="({ id, type: t, title, price, images }, idx) in objects"
      :key="id"
    >
      <object-card
        v-bind="{ type: t[0], title, price, images }"
        :data-idx="idx + 1"
        @fetch="load(idx + 1)"
      />
    </li>
  </ul>
</template>

<style lang="scss">
  .pagination {
    width: 30px;
    height: 30px;
    border: 2px solid grey;
  }
  ul {
    --fr: calc(100vw - 2 * var(--px));

    width: 100%;
    display: grid;
    grid-template-columns: var(--fr);
    place-items: center;

    li {
      width: inherit;
      margin-bottom: 20px;
    }

    @media (min-width: 768px) {
      --fr: calc(50vw - 1.5 * var(--px));
      grid-template-columns: repeat(2, var(--fr));
      justify-content: space-between;
    }

    @media (min-width: 1280px) {
      --fr: calc(25vw - 25px);
      grid-template-columns: repeat(4, var(--fr));
    }
  }
</style>
