<template>
  <div class="user-guide">
    <div
      ref="overlayRef"
      class="overlay"
      @click="toggleBigImage()"
    />
    <h1 class="heading">
      Возможности использования приложения
    </h1>
    <div
      v-for="item in items"
      :key="item.title"
      class="user-guide__item" 
    >
      <div class="item-img">
        <img
          class="small-img"
          :src="item.image"
          :alt="item.title"
          @click="currentBigImage = item.imageId; toggleBigImage()"
        >
        <img
          :id="item.imageId"
          class="big-img"
          :src="item.image"
          :alt="item.title"
          @click="toggleBigImage()"
        >
      </div>
      <div class="item-content">
        <h2 class="item-content__title">
          {{ item.title }}
        </h2>
        <p class="item-content__description">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import accountRecoveryImage from '@/assets/images/user-guide/account-recovery.png'
import authorizationImage from '@/assets/images/user-guide/authorization.png'
import botImage from '@/assets/images/user-guide/bot.png'
import mapBalloonImage from '@/assets/images/user-guide/map-balloon.png'
import mapImage from '@/assets/images/user-guide/map.png'
import profileImage from '@/assets/images/user-guide/profile.png'
import registrationImage from '@/assets/images/user-guide/registration.png'

const overlayRef = ref()
const currentBigImage = ref('')

const items = [
  {
    title: 'Авторизация',
    description: 'Для того, чтобы в полной мере пользоваться приложением, необходимо авторизоваться. Для этого нажмите на кнопку "Войти" в правом верхнем углу экрана.',
    image: authorizationImage,
    imageId: 'authorization'
  },
  {
    title: 'Регистрация',
    description: 'Если у вас еще нет аккаунта, вы можете зарегистрироваться, нажав на кнопку "Зарегистрироваться" в окне авторизации.',
    image: registrationImage,
    imageId: 'registration'
  },
  {
    title: 'Восстановление аккаунта',
    description: 'Если вы забыли пароль от своего аккаунта, вы можете восстановить его, нажав на кнопку "Забыли пароль?" в окне авторизации.',
    image: accountRecoveryImage,
    imageId: 'account-recovery'
  },
  {
    title: 'Профиль пользователя',
    description: 'Перейти в профиль можно выбрав пункт "Профиль" в выпадающем меню по клику на свой аватар в правом верхнем углу. В профиле можно изменить данные аккаунта, а также выйти.',
    image: profileImage,
    imageId: 'profile'
  },
  {
    title: 'Работа с картой',
    description: 'На странице с картой вы можете взаимодействовать с ней, а также использовать фильтр, чтобы отобразить на карте только те типы меток, которые вам интересны. Для добавления новой метки на карту вам необходимо быть авторизованным, после чего нажать на кнопку в правом нижнем углу карты и выбрать нужные опции.',
    image: mapImage,
    imageId: 'map'
  },
  {
    title: 'Содержимое меток',
    description: 'На карте расположены метки, на которые можно нажать и открыть их содержимое, просматривая, какие типы мусора можно выбросить на данной точке, увидеть название, автора метки, координаты и примерное месторасположение.',
    image: mapBalloonImage,
    imageId: 'map-balloon'
  },
  {
    title: 'Чат-бот',
    description: 'Чат-бот позволяет получить информацию по правилам сортировки мусора, помочь, что куда вам необходимо выбросить и не только. Для использования необходимо авторизоваться.',
    image: botImage,
    imageId: 'bot'
  }
]

const toggleBigImage = () => {
  const image = document.getElementById(currentBigImage.value)
  if (image) {
    image.classList.toggle('visible')
    overlayRef.value.classList.toggle('visible')
  }
}
</script>

<style lang="scss" scoped>
@import 'UserGuide';
</style>
