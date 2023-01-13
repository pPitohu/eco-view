<template>
  <div class="wrapper">
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
        >
        <br>
        <label for="Username">Username</label>
        <input
          id="Username"
          v-model="username"
          type="text"
        >
        <br>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
        >
        <br>
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
        >
        <br>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import useRegister from './Register'

export default {
  setup() {
    return useRegister()
  }
}
</script>

<style lang="scss" scoped>
@import 'Register';
</style>
