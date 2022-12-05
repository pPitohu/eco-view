<template>
  <header>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/login">
      Login
    </router-link>
    <router-link to="/register">
      Register
    </router-link>
    <router-link to="/profile">
      Profile
    </router-link>
  </header>
  <router-view />
</template>

<style lang="scss" scoped>
@import 'App';
</style>
