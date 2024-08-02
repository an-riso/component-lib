import type { Meta, StoryObj } from '@storybook/vue3'
//@ts-ignore
import Slider from './Slider.vue'

const meta: Meta<typeof Slider> = {
  title: 'Oversonic components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value1: { control: 'number' },
    value2: { control: 'number' },
    isDouble: { control: 'boolean' },
    isVisibleRange: { control: 'boolean' },
    colors: { control: 'array' }
  },
  args: {
    // Default args
    min: 0,
    max: 100,
    step: 1,
    value1: 20,
    value2: 80,
    isDouble: true,
    isVisibleRange: true,
    colors: ['#1B70ED', '#00AA00', '#FF0000']
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleSlider: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value2: 50,
    isDouble: false,
    isVisibleRange: true
  }
}

export const DoubleSlider: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value1: 20,
    value2: 80,
    isDouble: true,
    isVisibleRange: true,
    colors: ['#1B70ED']
  }
}

export const CustomColors: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value1: 25,
    value2: 75,
    isDouble: true,
    isVisibleRange: true,
    colors: ['#1B70ED', '#00AA00', '#FF0000']
  }
}
