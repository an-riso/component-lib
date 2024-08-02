<template>
  <div>
    <div
      class="flex items-center flex-wrap border border-solid form-control shadow appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-oversonic-blue"
    >
      <div class="flex items-center flex-wrap">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="flex items-center m-1 py-1 px-2 rounded bg-oversonic-blue text-white text-[0.69rem] font-bold not-italic"
        >
          {{ tag }}
          <button class="bg-transparent cursor-pointer" @click="removeTag(index)">
            <img class="ml-2" key="dwn" src="/static/img/icon_x.svg" />
          </button>
        </span>
        <input
          type="text"
          class="py-1 grow border-[0rem] outline-none w-60"
          v-model="newTag"
          @keydown.space.prevent="handleKeydown"
          @keydown.enter.prevent="handleKeydown"
          @keydown.delete="removeLastTag"
          placeholder="Add a label and press Enter/Space"
          @input="filterOptions"
        />
        <p v-if="errors" class="text-oversonic-red text-xs ml-1">*</p>
      </div>
    </div>
    <ul
      v-show="filteredOptions.length > 0"
      class="absolute mt-1 max-h-36 p-0 z-50 border border-solid border-zinc-300 overflow-y-auto list-none"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
        class="py-2 cursor-pointer hover:bg-[#f0f0f0]"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    error: {
      type: [String, Boolean],
      default: ''
    }
  },
  data() {
    return {
      dropdownOptions: [],
      tags: [...this.value],
      newTag: '',
      filteredOptions: []
    }
  },
  watch: {
    value(newVal) {
      this.tags = [...newVal]
    }
  },
  methods: {
    filterOptions() {
      if (this.newTag) {
        const lowercasedTag = this.newTag.toLowerCase()
        this.filteredOptions = this.dropdownOptions.filter(
          (option) => option.toLowerCase().includes(lowercasedTag) && !this.tags.includes(option)
        )
      } else {
        this.filteredOptions = []
      }
    },
    selectOption(option) {
      if (option && !this.tags.includes(option)) {
        this.tags.push(option)
        this.newTag = ''
        this.filteredOptions = []
        this.$emit('new-tag', this.tags)
      }
    },
    handleKeydown(event) {
      event.preventDefault() // Prevent the form from submitting
      this.addTag()
    },
    addTag() {
      if (this.newTag && !this.tags.includes(this.newTag)) {
        this.tags.push(this.newTag)
        this.$emit('new-tag', this.tags)
        this.newTag = ''
      }
      this.filteredOptions = []
    },
    removeTag(index) {
      this.tags.splice(index, 1)
      this.$emit('new-tag', this.tags)
    },
    removeLastTag(event) {
      if (event.target.value === '' && this.tags.length > 0) {
        this.tags.pop()
        this.$emit('new-tag', this.tags)
      }
    }
  }
}
</script>
