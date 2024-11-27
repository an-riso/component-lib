<template>
  <div class="relative inline-block text-left ml-auto" ref="dropdownMobilePatientMenu">
    <button
      @click="toggleMenu"
      class="flex items-center justify-center hover:rounded-full hover:bg-oversonic-white-hover focus:outline-none p-1"
    >
      <img src="../static/img/icon_menu.svg" alt="Menu" />
    </button>

    <!-- Menu dropdown -->
    <div
      v-if="isMenuOpen"
      class="origin-top-right absolute right-0 mt-2 w-52 rounded-lg shadow-lg bg-white ring-1 ring-oversonic-dark ring-opacity-5 focus:outline-none z-50"
      @click="closeMenu($event)"
    >
      <div class="w-full">
        <!-- Loop through menu items passed via props -->
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          href="#"
          class="px-4 py-3 text-sm text-oversonic-dark font-normal hover:bg-oversonic-white-hover flex items-center gap-2 flex-1"
          @click="handleAction(item.action, $event)"
        >
          <img v-if="item.icon" class="flex items-center" :src="item.icon" />
          {{ item.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu(event) {
      if (
        this.$refs.dropdownMobilePatientMenu &&
        !this.$refs.dropdownMobilePatientMenu.contains(event.target)
      ) {
        this.isMenuOpen = false
      }
    },
    handleAction(action, event) {
      event.preventDefault()
      this.closeMenu(event)
      if (typeof action === 'function') {
        action()
      }
    }
  }
}
</script>
