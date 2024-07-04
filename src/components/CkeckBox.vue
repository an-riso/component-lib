<template>
    <div class="modal-content">
      <div class="flex flex-col ">
        <div v-for="(row, rowIndex) in chunkedOptions" :key="rowIndex" class="flex">
          <div v-for="(option, colIndex) in row" :key="colIndex" class="checkbox-item flex items-center px-3 py-3 ">
            <input 
              class="w-5 h-5 border-gray-300 rounded-sm checked:border-oversonic-blue checked:accent-oversonic-blue "
              type="checkbox" 
              :id="`checkbox-${rowIndex}-${colIndex}`" 
              :value="option"
              v-model="selectedOptions"
            />
            <label :for="`checkbox-${rowIndex}-${colIndex}`" class="ml-[0.95rem]">{{ option }}</label>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selectedOptions: []
    }
  },
  computed: {
    chunkedOptions() {
      return this.chunkArray(this.options, 3);
    }
  },
  methods: {
    chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    },
    submit() {
      this.$emit('submit', this.selectedOptions);
      this.closeModal();
    },
  }
}
</script>

<style>
.checkbox-item {
  flex: 1;
}
</style>
