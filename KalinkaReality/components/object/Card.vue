<script lang="ts" setup>
  const { title } = defineProps<{
    type: string;
    title: { ru: string; en: string };
    price: string;
    images: string[];
  }>();

  const emits = defineEmits(["fetch"]);

  const lang: Ref<string> | string = inject("lang") ?? "en";
  const name = computed(() => title[lang.value]);

  const card = ref(null);
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const {
          dataset: { idx },
        } = target;
        if (isIntersecting && idx % 4 === 0) {
          emits("fetch");
        }
      });
    });

    observer.observe(card.value);
  });
</script>

<template>
  <section class="object-card" ref="card">
    <h2>{{ name }}</h2>
    <div class="type">{{ type }}</div>
    <Carousel
      :opts="{
        loop: true,
      }"
    >
      <CarouselContent>
        <CarouselItem
          class="slide"
          v-for="(img, idx) in images"
          :key="'object-card--img-' + idx"
        >
          <img :src="img" :alt="name" loading="lazy" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="prev" />
      <CarouselNext class="next" />
    </Carousel>
    <strong class="price">{{ price }} ฿</strong>
  </section>
</template>

<style lang="scss">
  .object-card {
    position: relative;

    h2,
    .type,
    .price {
      position: absolute;
      background-color: #fff;
      padding: 5px;
      z-index: 1;
    }
    h2 {
      font-size: 20px;
      top: 30px;
    }
    .type {
      font-size: 14px;
      right: 20px;
    }
    .price {
      font-size: 18px;
      bottom: 20px;
      right: 20px;
    }

    .slide {
      aspect-ratio: 4/3;
      img {
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    button {
      position: absolute;
      opacity: 0.25;
      &:hover {
        opacity: 1;
      }
      &.prev {
        left: 15px;
      }
      &.next {
        right: 15px;
      }
    }

    &:hover {
      button {
        opacity: 0.5;
      }
    }
  }
</style>
