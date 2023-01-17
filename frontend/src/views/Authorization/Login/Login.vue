<template>
  <div class="wrapper">
    <div class="login">
      <h1 class="heading h1">
        Вход
      </h1>
      <VeeForm
        v-slot="{ meta }"
        class="login-form"
        :validation-schema="loginFormValidator"
        @submit="login"
      >
        <TextField
          class="login-form__field"
          name="email"
          placeholder="Email"
          type="email"
          large
        />
        <TextField
          class="login-form__field"
          name="password"
          placeholder="Пароль"
          type="password"
          large
        />
        <BaseButton
          :disabled="!meta.valid"
          class="login-form__button"
          large
          type="submit"
        >
          Войти
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
      <div class="login-links">
        <router-link
          class="login-links__link primary"
          :to="{ name: 'register' }"
        >
          Зарегистрироваться
        </router-link>
        <router-link
          class="login-links__link"
          :to="{ name: 'forgot-password' }"
        >
          Забыли пароль?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form as VeeForm } from 'vee-validate'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import TextField from '@/components/common/TextField/TextField.vue'
import useLogin from './Login'

export default {
  components: {
    TextField,
    VeeForm,
    BaseButton,
  },
  setup() {
    return useLogin()
  }
}
</script>

<style lang="scss" scoped>
@import 'Login';
</style>
