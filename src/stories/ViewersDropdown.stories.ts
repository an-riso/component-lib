import type { Meta, StoryObj } from '@storybook/vue3'

import ViewersDropdown from '../components/ViewersDropdown.vue'

const colors = [
  '#7986CB',
  '#33B679',
  '#F4511E',
  '#F6BF26',
  '#3F51B5',
  '#616161',
  '#D50000',
  '#E67C73',
  '#0B8043',
  '#8E24AA',
  '#3E8BE6'
]

const meta: Meta<typeof ViewersDropdown> = {
  title: 'Oversonic components/ViewersDropdown',
  component: ViewersDropdown,
  tags: ['autodocs'],
  argTypes: {
    viewers: {
      control: 'array',
      description: 'Elenco degli utenti attivi',
      table: { type: { summary: 'Array<String>' } }
    },
    totalViewer: {
      control: 'number',
      description: 'Numero totale di utenti',
      table: { type: { summary: 'Number' } }
    },
    colors: {
      control: 'array',
      description: 'Elenco dei colori disponibili',
      table: { type: { summary: 'Array<String>' } }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args) => ({
  components: { ViewersDropdown },
  setup() {
    return { args }
  },
  template: `
    <div class="grid justify-center w-auto h-auto">
      <ViewersDropdown v-bind="args" />
    </div>
  `
})

// Storia base
export const Default: Story = Template.bind({})
Default.args = {
  viewers: ['Luigi Bianchi', 'Anna Verdi', 'Carlo Neri'],
  totalViewer: 3,
  colors: colors
}

// Storia con un solo utente
export const SingleUser: Story = Template.bind({})
SingleUser.args = {
  viewers: ['Matteo Gialli'],
  totalViewer: 1,
  colors: colors
}

// Storia con più utenti visualizzati
export const MultipleUsers: Story = Template.bind({})
MultipleUsers.args = {
  viewers: ['Marco Azzurri', 'Lucia Rosa', 'Paolo Nero', 'Simone Viola', 'Sara Grigi'],
  totalViewer: 5,
  colors: colors
}
