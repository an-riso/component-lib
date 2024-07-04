<template>
  <div v-if="isVisible" class="fixed flex items-center justify-center top-0 left-0 w-full h-full " style="background: rgb(0,0,0,0.75);">
    <div class="bg-white px-10 py-10 rounded-lg w-[40rem]">
      <h4 class="font-bold">Confirm Delete</h4>
      <div class="form-group mt-6 ">
        <label class="text-xs mb-2 capitalize">Please type "DELETE" to confirm:</label>
        <div class="pt-2">
          <input v-model="confirmationText" placeholder="Type 'DELETE' here"
            class="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-zinc-700"
              />
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button type="button" @click="cancel" class="button-default ml-auto text-black hover:bg-oversonic-grey hover:text-white">Cancel</button>
        <button type="submit" :disabled="confirmationText !== 'DELETE'" @click="confirm" 
          :class="{
            'bg-opacity-50 cursor-not-allowed ': confirmationText !== 'DELETE',
            'hover:bg-[#165ABE]': confirmationText === 'DELETE'
          }"
          class="button-default ml-4 text-white bg-oversonic-active ">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean
  },
  data() {
    return {
      confirmationText: ''
    };
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>
