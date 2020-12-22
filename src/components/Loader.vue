<template>
  <svg class="circular" height="50" width="50">
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke-width="6"
      stroke-miterlimit="10"
    />
  </svg>
</template>

<script>
export default {
  name: "Loader",
  props: {},
};
</script>

<style lang="scss">
.circular {
  animation: rotate 2s linear infinite;
  height: 50px;
  width: 50px;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: square;
  stroke:#ee1515;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>