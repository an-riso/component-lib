import type { Meta, StoryObj } from '@storybook/vue3'
//@ts-ignore
import MultiSelectDropdown from '../components/MultiSelectDropdown.vue'

const meta: Meta<typeof MultiSelectDropdown> = {
  title: 'Oversonic components/MultiSelectDropdown',
  component: MultiSelectDropdown,
  tags: ['autodocs'],
  argTypes: {
    initialIds: {
      control: { type: 'object' },
      description: 'Elenco degli ID inizialmente selezionati.'
    },
    peopleData: {
      control: { type: 'object' },
      description: 'Elenco di persone disponibili con campi `_id`, `firstname` e `lastname`.'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabilita il dropdown quando è impostato a `true`.'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: any) => ({
  components: { MultiSelectDropdown },
  setup() {
    return { args }
  },
  template: ` 
    <div class="h-60">
      <MultiSelectDropdown v-bind="args" @update:selectedIds="onUpdate" />
    </div>
    `,
  methods: {
    onUpdate: (selectedIds: string[]) => {
      console.log('Selected IDs:', selectedIds)
    }
  }
})

export const BasicDropdown: Story = Template.bind({})
BasicDropdown.args = {
  initialIds: [],
  peopleData: [
    { _id: '1', firstname: 'John', lastname: 'Doe' },
    { _id: '2', firstname: 'Jane', lastname: 'Smith' },
    { _id: '3', firstname: 'Emily', lastname: 'Johnson' }
  ],
  disabled: false
}

export const PreSelectedDropdown: Story = Template.bind({})
PreSelectedDropdown.args = {
  initialIds: ['1', '2'],
  peopleData: [
    { _id: '1', firstname: 'John', lastname: 'Doe' },
    { _id: '2', firstname: 'Jane', lastname: 'Smith' },
    { _id: '3', firstname: 'Emily', lastname: 'Johnson' }
  ],
  disabled: false
}

export const EmptyDropdown: Story = Template.bind({})
EmptyDropdown.args = {
  initialIds: [],
  peopleData: [],
  disabled: false
}

export const DisabledDropdown: Story = Template.bind({})
DisabledDropdown.args = {
  initialIds: [],
  peopleData: [
    { _id: '1', firstname: 'John', lastname: 'Doe' },
    { _id: '2', firstname: 'Jane', lastname: 'Smith' },
    { _id: '3', firstname: 'Emily', lastname: 'Johnson' }
  ],
  disabled: true
}

export const SelectAllDropdown: Story = Template.bind({})
SelectAllDropdown.args = {
  initialIds: [],
  peopleData: [
    { _id: '1', firstname: 'John', lastname: 'Doe' },
    { _id: '2', firstname: 'Jane', lastname: 'Smith' },
    { _id: '3', firstname: 'Emily', lastname: 'Johnson' },
    { _id: '4', firstname: 'Michael', lastname: 'Brown' },
    { _id: '5', firstname: 'Emma', lastname: 'Wilson' }
  ],
  disabled: false
}
