<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="leafs">
    <img src="@/assets/icons/login-leafs/leaf5.svg" alt="leaf5">
    <img src="@/assets/icons/login-leafs/leaf2.svg" alt="leaf2">
    <img src="@/assets/icons/login-leafs/leaf1.svg" alt="leaf1">
    <img src="@/assets/icons/login-leafs/leaf6.svg" alt="leaf6">
    <img src="@/assets/icons/login-leafs/leaf7.svg" alt="leaf7">
  </div>
</template>

<style lang="scss" scoped>
$default-animation-duration: 1.7s;
.leafs {
  position: fixed;
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
      top: 300px;
      left: 52px;
      animation-duration: $default-animation-duration, 2s;
    }
    &:nth-child(2) {
      top: 100px;
      left: 192px;
      animation-duration: $default-animation-duration, 2.4s;
    }
    &:nth-child(3) {
      top: 300px;
      left: 272px;
      width: 62px;
      height: 60px;
      animation-duration: $default-animation-duration, 2.7s;
    }
    &:nth-child(4) {
      top: 22px;
      left: 434px;
      animation-duration: $default-animation-duration, 2.5s;
    }
    &:last-child {
      top: 42px;
      left: 655px;
      width: 60px;
      height: 60px;
    }
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate(-100%, 80%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes flyIn {
  0% {
    opacity: 0;
    transform: translate(-100%, 80%);
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
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
