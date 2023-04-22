<template>
  <div class="home">
    <div class="home-card">
      <h1 class="home-card__title">
        EcoView
      </h1>
      <p class="home-card__subtitle">
        — твой помощник по сортировке мусора
      </p>
      <p class="home-card__description">
        В навигации сверху есть нужные инструкции, 
        а слева ты можешь переходить по страницам и использовать функционал приложения!
      </p>
      <img
        class="home-card__image"
        src="@/assets/images/raccoon.svg"
        alt="raccoon"
      >
    </div>
  </div>
</template>

<script lang="ts">

export default {
  components: {
  },
  setup() {
  }
}
</script>

<style lang="scss" scoped>
@import 'Home';
</style>
