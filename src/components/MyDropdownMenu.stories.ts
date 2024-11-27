import type { Meta, StoryObj } from '@storybook/vue3'
//@ts-ignore
import MyDropdownMenu from './DropdownMenu.vue'

const meta: Meta<typeof MyDropdownMenu> = {
  title: 'Oversonic components/MyDropdownMenu',
  component: MyDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      control: { type: 'object' },
      description:
        'Array di oggetti che rappresentano gli elementi del menu, ognuno con `label`, `icon` e `action`.'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const Template = (args: any) => ({
  components: { MyDropdownMenu },
  setup() {
    return { args }
  },
  template: `
    <div class="flex justify-end">
      <MyDropdownMenu v-bind="args" />
    </div>
  `
})

export const BasicMenu: Story = Template.bind({})
BasicMenu.args = {
  menuItems: [
    { label: 'Edit', icon: './src/static/img/icon_edit.svg', action: () => alert('Edit clicked') },
    { label: 'Delete', icon: './src/static/img/icon_delete.svg', action: () => alert('Delete clicked') },
    { label: 'Save', icon: './src/static/img/icon_save.svg', action: () => alert('Save clicked') }
  ]
}

export const CustomIconsMenu: Story = Template.bind({})
CustomIconsMenu.args = {
  menuItems: [
    {
      label: 'Calendar',
      icon: './src/static/img/icon_calendar.svg',
      action: () => alert('Calendar clicked')
    },
    {
      label: 'Robot',
      icon: './src/static/img/icon_robot.svg',
      action: () => alert('Robot clicked')
    },
    { label: 'Save', icon: './src/static/img/icon_save.svg', action: () => alert('Save clicked') }
  ]
}

export const EmptyMenu: Story = Template.bind({})
EmptyMenu.args = {
  menuItems: []
}
