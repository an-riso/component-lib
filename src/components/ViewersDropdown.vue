<template>
  <div
    ref="dropdownRefUsers"
    class="hidden md:flex items-center gap-1 rounded-full p-1 min-w-max ml-auto md:ml-4 w-fit font-sans"
    :class="{ 'md:bg-zinc-800': totalViewer > 0 }"
  >
    <div class="relative text-left contents">
      <div v-for="(user, index) in displayedUsers" :key="index">
        <button
          :data-title="user"
          class="flex items-center justify-center focus:outline-none customTooltipBottom relative"
        >
          <div
            class="size-8 items-center gap-2 flex-col flex justify-center relative rounded-full"
            :style="{ backgroundColor: getColorForUser(user) }"
          >
            <span
              class="relative text-center text-white font-normal text-xs leading-none transition duration-700 ease-in-out"
            >
              {{ getInitials(user) }}
            </span>
          </div>
        </button>
      </div>

      <div v-if="totalViewer > 3" class="flex items-center gap-1 rounded-full md:ml-0 min-w-max">
        <div class="relative inline-block text-left">
          <button @click="toggleUsersDropdown" class="flex items-center justify-center focus:outline-none">
            <div
              class="size-8 items-center gap-2 flex-col flex justify-center relative rounded-full bg-oversonic-white-hover"
            >
              <span
                class="relative text-center font-normal text-xs leading-none transition duration-700 ease-in-out text-oversonic-dark"
              >
                +{{ extraUserCount }}
              </span>
            </div>
          </button>

          <div v-if="isUsersPopupOpen" class="origin-top-right absolute right-0 rounded-md z-50">
            <div class="absolute text-white !mt-2 -right-1 bg-oversonic-dark rounded-lg w-48">
              <div
                v-for="(user, index) in extraUsers"
                :key="index"
                class="md:rounded-t-lg md:rounded-b-lg hover:bg-zinc-800 !py-3 px-4 block no-underline text-white whitespace-nowrap"
              >
                {{ user }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref } from 'vue'

const props = defineProps({
  viewers: {
    type: Array,
    default: () => []
  },
  totalViewer: {
    type: Number,
    default: 0
  },
  colors: {
    type: Array,
    default: () => []
  },
  isUsersPopupOpen: {
    type: Boolean,
    default: false
  }
})

const dropdownRefUsers = ref(null)
const viewers = ref(props.viewers)
const totalViewer = ref(props.totalViewer)
const colors = ref(props.colors)
const isUsersPopupOpen = ref(props.isUsersPopupOpen)

const userColorMap = new Map()

const displayedUsers = computed(() => {
  return totalViewer.value <= 3 ? viewers.value.slice(0, 3) : viewers.value.slice(0, 2)
})

const extraUserCount = computed(() => {
  return totalViewer.value > 3 ? totalViewer.value - 2 : 0
})

const extraUsers = computed(() => {
  return viewers.value.slice(2)
})

function getColorForUser(user) {
  if (!userColorMap.has(user)) {
    const availableColors = colors.value.filter((color) => ![...userColorMap.values()].includes(color))
    const nextColor = availableColors[0]
    if (nextColor) {
      userColorMap.set(user, nextColor)
    }
  }
  return userColorMap.get(user) || '#ccc'
}

const toggleUsersDropdown = () => {
  isUsersPopupOpen.value = !isUsersPopupOpen.value
}

const handleClickOutsideUsers = (event) => {
  if (dropdownRefUsers.value && !dropdownRefUsers.value.contains(event.target)) {
    isUsersPopupOpen.value = false
  }
}

function getInitials(name) {
  if (!name) return ''
  const names = name.split(' ')
  return names.map((word) => word.charAt(0).toUpperCase()).join('')
}

const eventHandlers = [handleClickOutsideUsers]

onMounted(() => {
  eventHandlers.forEach((handler) => {
    document.addEventListener('click', handler)
  })
})

onBeforeUnmount(() => {
  eventHandlers.forEach((handler) => {
    document.removeEventListener('click', handler)
  })
})
</script>
