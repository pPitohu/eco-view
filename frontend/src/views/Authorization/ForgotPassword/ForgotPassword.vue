<template>
  <div class="wrapper">
    <div class="forgot-password">
      <h1 class="heading h1">
        Восстановление<br>аккаунта
      </h1>
      <div v-auto-animate="{ duration: 150 }">
        <VeeForm
          v-if="!isResetCodeFormShown && !isPasswordFormShown && !isFinalScreenShown"
          v-slot="{ meta }"
          class="forgot-password-form"
          :validation-schema="emailFormValidator"
          @submit="sendResetMessage"
        >
          <TextField
            class="forgot-password-form__field"
            name="email"
            placeholder="Ваш email"
            type="email"
            large
          />
          <BaseButton
            :disabled="!meta.valid"
            :is-loading="isSendingResetMessage"
            class="forgot-password-form__button"
            large
            type="submit"
          >
            Восстановить
          </BaseButton>
        </VeeForm>
        <VeeForm
          v-if="isResetCodeFormShown && !isPasswordFormShown && !isFinalScreenShown"
          class="forgot-password-form"
          @submit="checkResetCodes"
        >
          <p class="forgot-password-form__text">
            Код восстановления отправлен на <span class="highlight">{{ userEmail }}</span>
          </p>
          <TextField
            class="forgot-password-form__field"
            name="code"
            placeholder="Код восстановления"
            type="text"
            large
          />
          <BaseButton
            class="forgot-password-form__button"
            large
            type="submit"
          >
            Отправить
          </BaseButton>
        </VeeForm>
        <VeeForm
          v-if="isPasswordFormShown && !isResetCodeFormShown && !isFinalScreenShown"
          v-slot="{ meta }"
          class="forgot-password-form"
          :validation-schema="newPasswordFormValidator"
          @submit="sendPasswordReset"
        >
          <TextField
            class="forgot-password-form__field"
            large
            name="password"
            type="password"
            placeholder="Новый пароль"
          />
          <TextField
            class="forgot-password-form__field"
            large
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
          />
          <BaseButton
            :disabled="!meta.valid"
            :is-loading="isSendingPasswordReset"
            class="forgot-password-form__button"
            large
            type="submit"
          >
            Сохранить
          </BaseButton>
        </VeeForm>
        <p
          v-if="isFinalScreenShown"
          class="forgot-password-final-screen"
        >
          Пароль успешно изменен!<br>
          Войдите в аккаунт с помощью нового пароля
        </p>
      </div>
      <div class="forgot-password-links">
        <router-link
          class="forgot-password-links__link"
          :class="{ 'larger-font': isFinalScreenShown }"
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
import useForgotPassword from './ForgotPassword'

export default {
  components: {
    TextField,
    VeeForm,
    BaseButton,
  },
  setup() {
    return useForgotPassword()
  }
}
</script>

<style lang="scss" scoped>
@import 'ForgotPassword';
</style>
