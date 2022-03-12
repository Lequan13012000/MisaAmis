<template>
  <div class="base-loading">
    <div class="base-loading__circle"></div>
  </div>
</template>

<script>
export default {
  name: "BaseLoading",
};
</script>

<style lang="scss" scoped>
.base-loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  &__circle {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-left-color: #8a6bf6;
    animation: loading 0.5s ease infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>