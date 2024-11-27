<template>
  <div class="relative w-full h-2 bg-gray-200 -mb-2">
    <div
      class="absolute h-full bg-oversonic-blue transition-all duration-500"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.bg-oversonic-blue {
  transition: width 0.5s ease-in-out;
}
</style>
