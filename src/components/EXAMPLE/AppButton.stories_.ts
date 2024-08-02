import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'

import Button from './Button.vue'

const meta = {
  title: 'Oversonic components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['medium', 'big'] },
    backgroundColor: { control: 'color' }
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn()
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonDefault: Story = {
  args: {
    label: 'Button',
    disabled: false,
    icon: true
  }
}

export const ButtonDisable: Story = {
  args: {
    label: 'Button',
    disabled: true,
    icon: true,
    size: 'medium'
  }
}
