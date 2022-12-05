<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
      >
      <br>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
      >
      <br>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import useLogin from './Login'

export default {
  setup() {
    return useLogin()
  }
}
</script>

<style lang="scss" scoped>
@import 'Login';
</style>
