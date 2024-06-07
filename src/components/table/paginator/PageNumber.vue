<script setup lang="ts">
withDefaults(
  defineProps<{
    large: boolean
    active: boolean
  }>(),
  {
    large: false,
    active: false
  }
)
</script>

<template>
  <li>
    <button
      :aria-current="active ? 'page' : undefined"
      class="flex items-center justify-center leading-tight"
      :class="[
        large ? 'px-4 h-10' : 'px-3 h-8',
        active
          ? 'z-10 font-semibold hover:bg-zinc-100 hover:text-zinc-400 d'
          : 'text-gray-300 bg-white  hover:bg-gray-100 hover:text-gray-700  '
      ]"
    >
      <slot></slot>
    </button>
  </li>
</template>
