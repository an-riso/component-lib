import { Meta, StoryObj } from '@storybook/vue3'
//@ts-ignore
import NavBar from '../components/NavBar.vue'

const meta: Meta<typeof NavBar> = {
  title: 'TODO/Navbar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    username: { control: 'text', description: 'Nome utente per il dropdown' },
    viewer: { control: 'array', description: 'Lista degli utenti connessi' },
    totalViewer: { control: 'number', description: 'Numero totale degli utenti' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: any) => ({
  components: { NavBar },
  setup() {
    return { args }
  },
  template: ` 
  <div class="w-screen h-48">
    <NavBar v-bind="args" />
  </div>
  `
})

//@ts-ignore
export const DefaultNavbar: Story = Template.bind({})
DefaultNavbar.args = {
  username: 'John Doe',
  viewer: ['Alice', 'Bob', 'Charlie'],
  totalViewer: 3
}

//@ts-ignore
export const MobileNavbar: Story = Template.bind({})
MobileNavbar.args = {
  username: 'Jane Smith',
  viewer: ['Alice', 'Bob', 'Charlie', 'David'],
  totalViewer: 4
}
