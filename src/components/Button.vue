<template>
  <button
    :disabled="!disabled"
    type="button"
    :class="classes"
    @click="onClick"
    :style="style"
    class="inline-flex items-center font-medium rounded-md text-sm px-6 text-white bg-[#1B70ED] hover:bg-[#165ABE]"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string
    /**
     * size of the button
     */
    size: 'medium' | 'big'
    /**
     * background color of the button
     */
    backgroundColor?: string

    icon?: Boolean

    disabled?: Boolean
  }>(),
  { size: 'big' }
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const classes = computed(() => ({
  'opacity-25 cursor-not-allowed': props.disabled,
  'py-2 h-12 cursor-pointer': props.size === 'big',
  'h-8 cursor-pointer': props.size === 'medium'
}))

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}))

const onClick = () => {
  emit('click', 1)
}
</script>
