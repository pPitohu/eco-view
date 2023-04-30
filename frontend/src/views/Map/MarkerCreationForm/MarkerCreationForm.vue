<template>
  <div class="marker-creation-form">
    <VeeForm
      v-slot="{ meta }"
      class="form"
      :validation-schema="markerCreationFormValidator"
      @submit="addMarker"
    >
      <div class="form-item">
        <p>Название пункта:</p>
        <TextField
          class="form-item__field"
          name="markerName"
          placeholder="Пункт №1"
          type="text"
        />
      </div>
      <div class="form-item">
        <p>Вид отходов:</p>
        <div class="checkbox-wrapper">
          <div
            v-for="([key, value]) in Object.entries(garbageType)"
            :key="value"
            v-auto-animate="{ duration: 100 }"
            class="checkbox"
            @click="selectCheckbox(key)"
          >
            <img
              v-if="selectedGarbageTypes.includes(key)"
              src="@/assets/icons/checkbox-unchecked.svg"
              alt="checkbox checked"
            >
            <img
              v-else
              src="@/assets/icons/checkbox-checked.svg"
              alt="checkbox unchecked"
            >
            <p class="checkbox-text">
              {{ value }}
            </p>
          </div>
        </div>
      </div>
      <BaseButton
        variant="danger"
        :disabled="!meta.valid"
        :is-loading="isLoading"
        type="submit"
      >
        Сохранить
      </BaseButton>
      <div
        v-if="shouldShowError && markerCoords.length === 0"
        v-auto-animate
        class="error"
      >
        Не выбрана точка на карте!
      </div>
    </VeeForm>
  </div>
</template>

<script lang="ts">
import { Form as VeeForm } from 'vee-validate'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import TextField from '@/components/common/TextField/TextField.vue'
import useMarkerCreationForm from './MarkerCreationForm'

export default {
  components: {
    VeeForm,
    TextField,
    BaseButton
  },
  props: {
    markerCoords: {
      type: Array,
      required: true,
    }
  },
  setup(props, context) {
    return useMarkerCreationForm(props, context)
  }
}
</script>

<style lang="scss" scoped>
@import 'MarkerCreationForm';
</style>
