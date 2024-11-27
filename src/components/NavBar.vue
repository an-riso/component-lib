<template>
  <nav
    id="navbarmenu"
    class="fixed top-0 left-0 w-full z-50 flex flex-row items-center px-4 md:px-8 py-2 justify-between shadow-xs bg-oversonic-dark font-openSans h-[3.75rem]"
    aria-label="Main navigation"
  >
    <div class="hidden md:flex lg:flex items-center flex-shrink-0 text-white md:pl-0 pl-4">
      <router-link to="/patients">
        <img alt="Oversonic Logo" src="./src/static/img/logo-oversonic.svg" />
      </router-link>
      <span class="font-semibold text-xl tracking-tight"></span>
    </div>

    <div class="md:hidden flex items-center">
      <button @click="toggleMobileMenu" class="text-white focus:outline-none">
        <img v-if="!isMobileMenuOpen" src="./src/static/img/icon_hamburger.svg" />
        <img v-else src="./src/static/img/icon_arrow_back.svg" />
      </button>
    </div>

    <div class="hidden ms:flex md:flex lg:flex items-center ml-8 min-w-max">
      <div class="dropdown-nav-css inline-block">
        <span class="block text-sm md:flex items-end md:mt-0 text-white mr-4">
          <router-link class="md:rounded-t-lg dropdown-li-link !py-3 px-4 mr-1" to="/patients">
            Patients
          </router-link>
        </span>
      </div>
      <div class="dropdown-nav-css inline-block">
        <span class="block text-sm md:flex items-end md:mt-0 text-white mr-4">
          <router-link class="md:rounded-t-lg dropdown-li-link !py-3 px-4 mr-1" to="/scheduler">
            Scheduler
          </router-link>
        </span>
      </div>
    </div>

    <div class="hidden lg:flex md:flex md:w-5/6"></div>

    <!-- Viewer -->
    <div
      v-show="!isMobileMenuOpen"
      ref="dropdownRefUsers"
      class="hidden md:flex items-center gap-1 rounded-full p-1 min-w-max ml-auto md:ml-4"
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
              <span class="animation-user-button">
                {{ getInitials(user) }}
              </span>
            </div>
          </button>
        </div>

        <div
          v-if="totalViewer > 3"
          class="sm:flex md:flex lg:flex items-center gap-1 rounded-full md:bg-zinc-800 md:ml-0 min-w-max"
        >
          <div class="relative inline-block text-left">
            <button @click="toggleUsersDropdown" class="flex items-center justify-center focus:outline-none">
              <div
                class="size-8 items-center gap-2 flex-col flex justify-center relative rounded-full bg-oversonic-white-hover"
              >
                <span class="animation-user-button text-oversonic-dark"> +{{ extraUserCount }} </span>
              </div>
            </button>
            <div v-if="isUsersPopupOpen" class="origin-top-right absolute right-0 rounded-md z-50">
              <div class="list-dropdown-ul w-48 right-0">
                <div
                  v-for="(user, index) in extraUsers"
                  :key="index"
                  class="md:rounded-t-lg md:rounded-b-lg list-dropdown-li"
                >
                  {{ user }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="!isMobileMenuOpen"
      ref="dropdownRefCare"
      class="flex items-center gap-1 rounded-full md:bg-zinc-800 p-1 md:ml-4 ml-auto min-w-max"
    >
      <div class="relative inline-block text-left">
        <button @click="toggleDropdown" class="flex items-center justify-center focus:outline-none">
          <div
            class="size-9 items-center gap-2 flex-col flex justify-center relative rounded-full"
            :style="{ backgroundColor: getColorForUser(props.username) }"
          >
            <span class="animation-user-button">
              {{ getInitials(props.username) }}
            </span>
          </div>

          <span class="hidden md:flex items-center justify-between px-3 font-semibold">
            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5L9.33013 0.5H0.669873L5 5Z" fill="white" />
            </svg>
          </span>
        </button>

        <div v-if="isDropdownOpen" class="origin-top-right absolute right-0 rounded-md z-50">
          <div class="list-dropdown-ul w-48 right-0">
            <div class="md:rounded-t-lg md:rounded-b-lg list-dropdown-li">
              <a href="/logout">Logout</a>
            </div>
            <div
              class="border-t-[1px] border-t-zinc-700 md:rounded-t-lg md:rounded-b-lg text-[9px] border-solid h-6"
            >
              <p class="block text-white mt-1 ml-4">Version: {{ version }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-show="!isMobileMenuOpen && totalViewer > 0" ref="dropdownRefUsersMobile">
      <div class="md:hidden flex items-center gap-1 rounded-full md:ml-0 min-w-max">
        <div class="relative inline-block text-left -top-2 -left-3">
          <button
            @click="toggleUsersDropdownMobile"
            class="flex items-center justify-center focus:outline-none"
          >
            <div
              class="size-5 items-center gap-2 flex-col flex justify-center relative rounded-full bg-oversonic-white-hover"
            >
              <span class="animation-user-button text-oversonic-dark"> +{{ totalViewer }} </span>
            </div>
          </button>
          <div v-if="isUsersPopupOpenMobile" class="origin-top-right absolute right-0 rounded-md z-50">
            <div class="list-dropdown-ul w-48 right-0 top-4">
              <div
                v-for="(user, index) in viewerStore"
                :key="index"
                class="md:rounded-t-lg md:rounded-b-lg list-dropdown-li"
              >
                {{ user }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-14 left-0 w-full h-screen bg-oversonic-dark z-50"
    >
      <router-link
        @click.enter="closeMobileMenu"
        to="/patients"
        class="px-4 py-3 text-sm text-oversonic-white font-normal hover:bg-oversonic-grey-hover flex items-center gap-2 flex-1"
      >
        Patients
      </router-link>
      <router-link
        @click.enter="closeMobileMenu"
        to="/scheduler"
        class="px-4 py-3 text-sm text-oversonic-white font-normal hover:bg-oversonic-grey-hover flex items-center gap-2 flex-1"
      >
        Scheduler
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

const props = defineProps({
  username: String,
  viewer: Array,
  totalViewer: Number
})

const userColorMap = ref(new Map())
console.log(props.viewer, props.totalViewer)
const version = process.env.PACKAGE_VERSION
const viewerStore = ref(props.viewer)
const totalViewer = ref(props.totalViewer)

const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const dropdownRefCare = ref(null)
const dropdownRefUsers = ref(null)
const isUsersPopupOpen = ref(false)
const dropdownRefUsersMobile = ref(null)
const isUsersPopupOpenMobile = ref(false)

function getColorForUser(user) {
  if (!userColorMap.value.has(user)) {
    const availableColors = colors.filter((color) => ![...userColorMap.value.values()].includes(color))
    const nextColor = availableColors[0]
    if (nextColor) {
      userColorMap.value.set(user, nextColor)
    }
  }
  return userColorMap.value.get(user)
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleClickOutside = (event) => {
  if (dropdownRefCare.value && !dropdownRefCare.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const displayedUsers = computed(() => {
  return totalViewer.value <= 3 ? viewerStore.value.slice(0, 3) : viewerStore.value.slice(0, 2)
})

const extraUserCount = computed(() => {
  return viewerStore.value.length > 3
    ? viewerStore.value.length - 2
    : viewerStore.value.length > 2
      ? viewerStore.value.length - 3
      : 0
})

const toggleUsersDropdown = () => {
  isUsersPopupOpen.value = !isUsersPopupOpen.value
}

const toggleUsersDropdownMobile = () => {
  isUsersPopupOpenMobile.value = !isUsersPopupOpenMobile.value
}

const handleClickOutsideUsers = (event) => {
  if (dropdownRefUsers.value && !dropdownRefUsers.value.contains(event.target)) {
    isUsersPopupOpen.value = false
  }
}
const handleClickOutsideUsersMobile = (event) => {
  if (dropdownRefUsersMobile.value && !dropdownRefUsersMobile.value.contains(event.target)) {
    isUsersPopupOpenMobile.value = false
  }
}

const extraUsers = computed(() => {
  return viewerStore.value.slice(2)
})

const eventHandlers = [handleClickOutside, handleClickOutsideUsers, handleClickOutsideUsersMobile]

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

const getInitials = (name) => {
  if (!name) return ''
  const names = name.split(' ')
  const initials = names.map((word) => word.charAt(0).toUpperCase()).join('')
  return initials
}
const colors = [
  '#7986CB',
  '#33B679',
  '#F4511E',
  '#F6BF26',
  '#3F51B5',
  '#616161',
  '#D50000',
  '#E67C73',
  '#0B8043',
  '#8E24AA',
  '#3E8BE6'
]
</script>
