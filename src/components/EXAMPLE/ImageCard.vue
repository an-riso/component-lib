<template>
  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
    <img class="rounded-t-lg h-56 w-full object-cover" :src="imageUrl" />
    <div class="p-5">
      <div class="flex justify-between">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ title }}
        </h5>
        <p class="self-center text-green-700">
          <span class="text-gray-400 line-through" v-if="oldPrice">
            {{ oldPrice }}
          </span>
          {{ price }}
        </p>
      </div>
      <p class="mb-6 font-normal text-gray-700">{{ text }}</p>
      <AppButton class="w-full" @click="buyClick">Buy it</AppButton>
      <AppButton class="w-full" @click="cancelClick" outlined>Cancel</AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from './EXAMPLE/Button.vue'

defineProps({
  title: String,
  text: String,
  imageUrl: String,
  price: String,
  oldPrice: String,
  buyClick: Function,
  cancelClick: Function
})
</script>
