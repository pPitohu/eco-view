<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="leafs">
    <img src="@/assets/icons/login-leafs/leaf1.svg" alt="leaf1">
    <img src="@/assets/icons/login-leafs/leaf8.svg" alt="leaf8">
    <img src="@/assets/icons/login-leafs/leaf4.svg" alt="leaf4">
  </div>
</template>

<style lang="scss" scoped>
$default-animation-duration: 1.7s;
.leafs {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: fadeInLeft $default-animation-duration cubic-bezier(.12,.86,.56,1) forwards;
  img {
    animation: 
      flyIn $default-animation-duration cubic-bezier(.12,.86,.56,1) forwards, 
      floating 3s ease-in-out $default-animation-duration infinite;
    position: absolute;
    user-select: none;
    &:first-child {
      bottom: 6px;
      right: 0;
      animation-duration: $default-animation-duration, 2s;
    }
    &:nth-child(2) {
      width: 60px;
      height: 60px;
      bottom: 46px;
      right: 190px;
      animation-duration: $default-animation-duration, 2.4s;
    }
    &:last-child {
      bottom: 211px;
      right: 43px;
      width: 60px;
      height: 60px;
    }
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate(100%, -80%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes flyIn {
  0% {
    opacity: 0;
    transform: translate(100%, -80%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes floating {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-5px, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
