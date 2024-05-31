<script lang="ts" setup>
  const lang = inject("lang");
</script>

<template>
  <header class="app-header">
    <img
      class="logo"
      src="https://kalinka-thailand.com/images/logo_top.png"
      alt="Thailand real estate"
      @click="lang === 'en' ? (lang = 'ru') : (lang = 'en')"
    />
    <h1>
      Kalinka Thailand
      <span> premium real estate </span>
    </h1>
  </header>
</template>

<style lang="scss">
  header.app-header {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    align-items: center;
    column-gap: 10px;
    background-color: #fff;
    box-shadow: 0 10px 20px -25px #444;
    padding: 10px;
    z-index: 9;
    margin-bottom: 10px;

    h1 {
      font-size: 28px;
      text-align: center;
      span {
        display: block;
        font-size: 20px;
        opacity: 0.5;
      }
    }

    .logo {
      // width: 85px;
    }
  }
</style>
