import type { Meta, StoryObj } from '@storybook/vue3'
import ProgressBar from '../components/ProgressBar.vue'

const meta: Meta<typeof ProgressBar> = {
  title: 'Oversonic components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Valore della barra di progresso in percentuale.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args) => ({
  components: { ProgressBar },
  setup() {
    return { args }
  },
  template: '<ProgressBar v-bind="args" />'
})

export const Default: Story = Template.bind({})
Default.args = {
  progress: 50 // Valore iniziale del progresso
}

export const ZeroProgress: Story = Template.bind({})
ZeroProgress.args = {
  progress: 0 // Progressione a 0%
}

export const FullProgress: Story = Template.bind({})
FullProgress.args = {
  progress: 100 // Progressione completa al 100%
}
