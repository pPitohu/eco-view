<template>
  <div class="wrapper">
    <div class="register">
      <h1 class="heading h1">
        Регистрация
      </h1>
      <VeeForm
        v-slot="{ meta }"
        class="register-form"
        :validation-schema="registerFormValidator"
        @submit="register"
      >
        <TextField
          class="register-form__field"
          name="email"
          placeholder="Email"
          type="email"
          large
        />
        <TextField
          class="register-form__field"
          name="username"
          placeholder="Логин"
          type="text"
          large
        />
        <TextField
          class="register-form__field"
          name="password"
          placeholder="Пароль"
          type="password"
          large
        />
        <TextField
          class="register-form__field"
          name="confirmPassword"
          placeholder="Подтверждение пароля"
          type="password"
          large
        />
        <BaseButton
          :disabled="!meta.valid"
          :is-loading="isLoading"
          class="register-form__button"
          large
          type="submit"
        >
          Зарегистрироваться
          <template #appendIcon>
            <img
              width="32"
              height="32"
              src="@/assets/icons/sign-in-circle.svg"
              alt="sign in circle"
            >
          </template>
        </BaseButton>
      </VeeForm>
      <div class="register-links">
        <p class="helper-text">
          Уже есть аккаунт?
        </p>
        <router-link
          class="register-links__link"
          :to="{ name: 'login' }"
        >
          Войти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form as VeeForm } from 'vee-validate'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import TextField from '@/components/common/TextField/TextField.vue'
import useRegister from './Register'

export default {
  components: {
    VeeForm,
    BaseButton,
    TextField
  },
  setup() {
    return useRegister()
  }
}
</script>

<style lang="scss" scoped>
@import 'Register';
</style>
