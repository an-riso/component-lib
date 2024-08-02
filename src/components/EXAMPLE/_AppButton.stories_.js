import AppButton from './Button.vue'

export default {
  title: 'Test/AppButton',
  component: AppButton,
  argTypes: {
    outlined: { control: 'boolean' }
  }
}

const Template = (args) => ({
  components: { AppButton },
  setup: () => ({ args }),
  template: '<AppButton v-bind="args">{{ args.default }}</AppButton>'
})

export const Primary = Template.bind({})
Primary.args = {
  default: 'First Button'
}
