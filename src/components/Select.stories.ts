import type { Meta, StoryObj } from '@storybook/vue3'
//@ts-ignore
import InputSelect from './InputSelect.vue'

const meta: Meta<typeof InputSelect> = {
  title: 'Oversonic components/InputSelect',
  component: InputSelect,
  tags: ['autodocs'],
  argTypes: {
    keyProp: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    type: { control: { type: 'select', options: ['single', 'multi', 'number', 'multi-select'] } }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: any) => ({
  components: { InputSelect },
  setup() {
    return { args }
  },
  template: '<InputSelect v-bind="args" />'
})
//@ts-ignore
export const SingleSelect: Story = Template.bind({})
SingleSelect.args = {
  keyProp: 'single-select',
  placeholder: 'Select an option',
  options: [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' }
  ],
  type: 'single'
}
//@ts-ignore
export const MultiSelect: Story = Template.bind({})
MultiSelect.args = {
  keyProp: 'multi-select',
  placeholder: 'Select multiple options',
  options: [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' }
  ],
  type: 'multi'
}
//@ts-ignore
export const NumberSelect: Story = Template.bind({})
NumberSelect.args = {
  keyProp: 'number-select',
  placeholder: 'Enter a number',
  type: 'number'
}
//@ts-ignore
export const MultiSelectWithDropdowns: Story = Template.bind({})
MultiSelectWithDropdowns.args = {
  keyProp: 'multi-select-dropdowns',
  placeholder: 'Select options',
  options: [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' }
  ],
  type: 'multi-select'
}
