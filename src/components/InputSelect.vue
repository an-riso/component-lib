<template>
  <div class="form-group grid">
    <label v-if="placeholder" :for="keyProp" class="text-xs mt-2 mb-2 capitalize flex flex-col items-start">{{
      placeholder
    }}</label>
    {{ console.log(options) }}
    <div v-if="type === 'single'" class="relative">
      <select
        :id="keyProp"
        v-model="selectedValue"
        class="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-oversonic-blue"
      >
        <option
          v-for="option in options"
          :key="option.value || option._id || option.id"
          :value="option.value || option._id || option.id"
        >
          {{ option.text || option.name }}
        </option>
      </select>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1611_3404)">
            <path
              d="M7.91 8.58984L12.5 13.1698L17.09 8.58984L18.5 9.99984L12.5 15.9998L6.5 9.99984L7.91 8.58984Z"
              fill="#111111"
            />
          </g>
          <defs>
            <clipPath id="clip0_1611_3404">
              <rect width="24" height="24" fill="white" transform="translate(0.5)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>

    <div v-else-if="type === 'multi'" class="checkbox-container">
      <div
        v-for="option in options"
        :key="option.value || option._id || option.id"
        class="flex items-center px-4 py-2"
      >
        <input
          class="w-5 h-5 rounded-sm checked:border-oversonic-blue checked:accent-oversonic-blue hover:border-oversonic-blue focus:border-oversonic-blue"
          :id="`checkbox-${option.value || option._id || option.id}`"
          type="checkbox"
          :value="option.value || option._id || option.id"
          v-model="selectedOptions"
        />
        <label :for="`checkbox-${option.value || option._id || option.id}`" class="ml-2">{{
          option.text || option.name
        }}</label>
      </div>
    </div>

    <div v-else-if="type === 'number'" class="number-container">
      <div class="flex items-center py-2">
        <input
          class="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-oversonic-blue"
          :id="keyProp"
          type="number"
          v-model.number="selectedValue"
        />
        <!--label :for="keyProp">{{ placeholder }}</label-->
      </div>
    </div>

    <div v-else-if="type === 'multi-select'" class="multi-select-container">
      <div
        v-for="option in options"
        :key="option.value || option._id"
        class="flex items-center justify-between px-4 py-2 w-full bg-oversonic-white-hover relative"
      >
        <span>{{ option.text || option.name }}</span>
        <div class="relative flex items-center w-32 ml-auto">
          <select
            :id="`select-${option.value || option._id}`"
            v-model="optionSelections[option.value || option._id]"
            class="form-control shadow appearance-none border rounded py-1 px-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline hover:border-oversonic-blue pr-8"
          >
            <option value="valid">Train/Valid</option>
            <option value="test">Test</option>
          </select>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1611_3404)">
                <path
                  d="M7.91 8.58984L12.5 13.1698L17.09 8.58984L18.5 9.99984L12.5 15.9998L6.5 9.99984L7.91 8.58984Z"
                  fill="#111111"
                />
              </g>
              <defs>
                <clipPath id="clip0_1611_3404">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    keyProp: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'single' // can be 'single', 'multi', 'number', or 'multi-select'
    }
  },
  data() {
    return {
      selectedValue: this.value,
      selectedOptions: [],
      optionSelections: {} // Store selections for 'multi-select' type
    }
  },
  watch: {
    selectedValue(newValue) {
      this.$emit('update', { [this.keyProp]: newValue })
    },
    selectedOptions(newValue) {
      this.$emit('update', { [this.keyProp]: newValue })
    },
    optionSelections: {
      deep: true,
      handler(newValue) {
        this.$emit('update', { [this.keyProp]: newValue })
      }
    }
  },
  methods: {
    clearSelection() {
      this.selectedValue = ''
    }
  },
  created() {
    if (this.options.length > 0) {
      this.selectedValue = this.options[0].value || this.options[0]._id || this.options[0].id
    } else if (this.value !== '') {
      this.selectedValue = this.value
    }
  }
}
</script>

<style scoped>
.checkbox-container {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  padding: 4px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.33);
}

.checkbox-item {
  margin-bottom: 8px;
}

.multi-select-container {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.33);
}
</style>
