<template>
  <div v-if="isVisible" class="modal-overlay fixed flex items-center justify-center top-0 left-0 w-full h-full " style="background: rgb(0,0,0,0.75);">
    <div class="bg-white px-10 py-10 rounded-lg w-[40rem]">
      <h4 class="font-bold">{{ title }}</h4>
      <form @submit.prevent="onSave">
          <div v-for="(_, key) in formData" :key="key" class="form-group mt-6 ">
            <label :for="key" class="text-xs mb-2 capitalize">{{ key }}</label>
            <div class="pt-2">
              <span v-if="key !== 'labels' && key !== 'annotationType'">
                <input
                  :id="key"
                  v-model="formData[key]"
                  :placeholder="'Enter ' + key"
                  class="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-zinc-700"
                />
              </span>
              <span v-else-if="key === 'labels'">
                {{ key }} {{ formData }} 
                <InputTag  v-model="formData[key]"/>
                {{ formData[key] }}
              </span>
              <span v-else-if="key === 'annotationType'">
                DROPDOWN
                <CkeckBox class="mt-6 "
                  :options="[
                    'Option 1', 'Option 2', 'Option 3', 
                    'Option 4', 'Option 5', 'Option 6',
                    'Option 7', 'Option 8', 'Option 9'
                  ]"
                  v-model="formData[key]"
                />
              </span>
            </div>
          </div>
        <div class="modal-actions mt-6 flex justify-end">
          <button type="button" @click="onCancel" class="button-default ml-auto text-black hover:bg-oversonic-grey hover:text-white">Cancel</button>
          <button type="submit" class="button-default ml-4 text-white bg-oversonic-active hover:bg-oversonic-active-hover">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputTag from '../modal/InputTag.vue';
import CkeckBox from '../modal/CkeckBox.vue';

export default {
  components:{
    InputTag, 
    CkeckBox
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    console.log('data MODAL', this.data, this.title);
    return {
      formData: { ...this.data }
    };
  },
  watch: {
    data(newData) {
      console.log(newData);
      this.formData = { ...newData };
    }
  },
  methods: {
    onSave() {
      console.log(this.formData);
      this.$emit('save', this.formData);
    },
    onCancel() {
      console.log('-->',this.formData)
      this.$emit('cancel');
    }
  }
};
</script>
