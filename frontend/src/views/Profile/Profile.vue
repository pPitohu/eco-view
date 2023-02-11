<template>
  <div class="profile">
    <div class="profile-card">
      <div class="profile-card__image">
        <img
          class="avatar"
          :src="user.image.imageLink"
          alt="avatar"
        >
        <div
          class="profile-card__image-edit"
          @click="selectImage"
        >
          <img
            src="@/assets/icons/pencil-white.svg"
            alt="pencil-white"
          >
          <input
            ref="imageInput"
            class="image-input"
            type="file"
            accept="image/*"
            @change.stop="updateImage"
            @click.stop
          >
        </div>
      </div>
      <div class="profile-card__credentials">
        <div class="credentials-item">
          <p class="credentials-item__title">
            Логин
          </p>
          <div
            v-auto-animate="{ duration: 150 }"
            class="credentials-item__value"
          >
            <VeeForm
              v-if="isEditingUsername"
              v-slot="{ meta }"
              v-click-outside="toggleEditingUsername"
              class="credentials-item__value-editing"
              :validation-schema="userNameFormValidator"
              @submit="saveUsername"
            >
              <TextField
                with-border
                name="username"
                placeholder="Логин"
                type="text"
                :value="user.username || ''"
                autofocus
              />
              <BaseButton
                :disabled="!meta.valid"
                class="credentials-item__value-save"
                type="submit"
              >
                Сохранить
              </BaseButton>
            </VeeForm>
            <span v-else>{{ user.username }}</span>
            <div
              v-if="!isEditingUsername"
              class="credentials-item__value-edit"
              @click="toggleEditingUsername"
            >
              <img
                src="@/assets/icons/pencil.svg"
                alt="pencil"
              >
            </div>
          </div>
        </div>
        <div class="credentials-item">
          <p class="credentials-item__title">
            Email
          </p>
          <div
            v-auto-animate="{ duration: 150 }"
            class="credentials-item__value"
          >
            <VeeForm
              v-if="isEditingEmail"
              v-slot="{ meta }"
              v-click-outside="toggleEditingEmail"
              class="credentials-item__value-editing"
              :validation-schema="emailFormValidator"
              @submit="saveEmail"
            >
              <TextField
                with-border
                name="email"
                placeholder="Email"
                type="email"
                :value="user.email || ''"
                autofocus
              />
              <BaseButton
                :disabled="!meta.valid"
                class="credentials-item__value-save"
                type="submit"
              >
                Сохранить
              </BaseButton>
            </VeeForm>
            <span v-else>{{ user.email }}</span>
            <div
              v-if="!isEditingEmail"
              class="credentials-item__value-edit"
              @click="toggleEditingEmail"
            >
              <img
                src="@/assets/icons/pencil.svg"
                alt="pencil"
              >
            </div>
          </div>
        </div>
        <div class="credentials-item">
          <p class="credentials-item__title">
            Пароль
          </p>
          <div class="credentials-item__value">
            <span>***********</span>
            <ModalWindow
              :is-open="isPasswordModalOpen"
              @close="togglePasswordModal"
            >
              <VeeForm
                v-slot="{ meta }"
                class="edit-form"
                :validation-schema="newPasswordFormValidator"
                @submit="changePassword"
              >
                <p class="edit-form__title">
                  Смена пароля
                </p>
                <TextField
                  with-border
                  name="password"
                  type="password"
                  placeholder="Новый пароль"
                  autofocus
                />
                <TextField
                  with-border
                  name="confirmPassword"
                  type="password"
                  placeholder="Подтвердите пароль"
                />
                <BaseButton
                  :disabled="!meta.valid"
                  type="submit"
                  class="edit-form__button"
                >
                  Сохранить
                </BaseButton>
              </VeeForm>
            </ModalWindow>
            <div
              class="credentials-item__value-edit"
              @click="togglePasswordModal"
            >
              <img
                src="@/assets/icons/pencil.svg"
                alt="pencil"
              >
            </div>
          </div>
        </div>
        <BaseButton
          variant="danger"
          class="credentials-logout"
          @click="logout"
        >
          Выйти
          <template #appendIcon>
            <img
              width="25"
              height="26"
              src="@/assets/icons/logout-icon.svg"
              alt="logout-icon"
            >
          </template>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form as VeeForm } from 'vee-validate'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import ModalWindow from '@/components/common/ModalWindow/ModalWindow.vue'
import TextField from '@/components/common/TextField/TextField.vue'
import useProfile from './Profile'

export default {
  components: {
    BaseButton,
    TextField,
    ModalWindow,
    VeeForm
  },
  setup() {
    return useProfile()
  }
}
</script>

<style lang="scss" scoped>
@import 'Profile';
</style>
