<template>
  <div>
    <div
      class="flex flex-wrap items-center w-full focus:outline-none focus:shadow-outline hover:border-oversonic-blue-hover"
    >
      <template v-for="user in selectedPeople" :key="user._id || user">
        <span
          class="flex items-center bg-oversonic-white-hover text-oversonic-dark text-sm font-medium rounded-full px-3 py-1 mr-2 my-1"
        >
          {{ user.firstname }} {{ user.lastname }}
          <button
            v-if="!disabled"
            :disabled="disabled"
            type="button"
            @click="removeUser(user._id || user)"
            class="ml-1 text-oversonic-dark text-sm focus:outline-none"
          >
            &times;
          </button>
        </span>
      </template>

      <div class="relative -mb-1" ref="dropdownRefUser">
        <button
          v-if="!disabled"
          :disabled="disabled"
          type="button"
          @click="toggleDropdown"
          class="rounded-full bg-oversonic-blue w-14 h-7 justify-center items-center focus:outline-none focus:shadow-outline hover:!bg-oversonic-blue-hover"
        >
          <img class="mx-auto" src="../static/img/icon_add.svg" alt="Add" />
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute bg-white border rounded shadow-lg w-max z-10 overflow-auto"
          :class="[openUpward ? 'right-0 ' : 'left-0', allSelected ? 'h-auto' : 'max-h-[190px]']"
        >
          <button
            v-if="peopleData.length > 0"
            @click="toggleAllPeople"
            class="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {{ allSelected ? 'Remove All' : 'Add All' }}
          </button>
          <button
            v-for="user in filteredUsers"
            :key="user._id"
            @click="addUser(user._id)"
            class="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {{ user.firstname }} {{ user.lastname }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

export default {
  props: {
    initialIds: {
      type: Array,
      default: () => []
    },
    peopleData: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const selectedPeople = ref([])
    const isDropdownOpen = ref(false)
    const dropdownRefUser = ref(null)
    const openUpward = ref(false)

    const updateSelectedPeople = () => {
      const flatIds = Array.isArray(props.initialIds[0]) ? props.initialIds.flat() : props.initialIds

      if (flatIds.length > 0) {
        selectedPeople.value = flatIds
          .map((id) => (typeof id === 'object' ? id : props.peopleData.find((user) => user._id === id)))
          .filter(Boolean)
      } else {
        selectedPeople.value = []
      }
    }

    watch(() => props.initialIds, updateSelectedPeople, { immediate: true, deep: true })

    const filteredUsers = computed(() =>
      props.peopleData.filter((user) => !selectedPeople.value.some((selected) => selected._id === user._id))
    )

    const allSelected = computed(
      () => selectedPeople.value.length === props.peopleData.length && props.peopleData.length > 0
    )

    const addUser = (userId) => {
      const user = props.peopleData.find((p) => p._id === userId)
      if (user && !selectedPeople.value.some((p) => p._id === user._id)) {
        selectedPeople.value.push(user)
        toggleDropdown()
        emit(
          'update:selectedIds',
          selectedPeople.value.map((p) => p._id)
        )
      }
    }

    const removeUser = (userId) => {
      selectedPeople.value = selectedPeople.value.filter((user) => user._id !== userId)
      emit(
        'update:selectedIds',
        selectedPeople.value.map((p) => p._id)
      )
    }

    const toggleAllPeople = () => {
      if (allSelected.value) {
        selectedPeople.value = []
      } else {
        selectedPeople.value = [...props.peopleData]
      }
      toggleDropdown()
      emit(
        'update:selectedIds',
        selectedPeople.value.map((p) => p._id)
      )
    }

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
      if (isDropdownOpen.value) {
        checkSpace()
      }
    }

    const checkSpace = () => {
      const buttonRect = dropdownRefUser.value.getBoundingClientRect()
      const spaceBelow = window.innerWidth - buttonRect.right
      const menuWidth = 200
      openUpward.value = spaceBelow < menuWidth
    }

    const handleClickOutside = (event) => {
      if (dropdownRefUser.value && !dropdownRefUser.value.contains(event.target)) {
        isDropdownOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      selectedPeople,
      filteredUsers,
      isDropdownOpen,
      allSelected,
      addUser,
      removeUser,
      toggleAllPeople,
      toggleDropdown,
      dropdownRefUser,
      openUpward
    }
  }
}
</script>
