import SvgLogo from './img/tools.svg'
import SvgArrow from './img/icon-arrow.svg'
import { IconGallery, IconItem } from '@storybook/blocks'

export default {
  title: 'Test/Icons',
  component: SvgLogo,
  argTypes: {}
}

const Template = () => ({
  components: { SvgArrow },
  template: '<img src="{./img/icon-arrow.svg}" />'
})

const Template2 = () => ({
  components: { SvgArrow },
  template: '<img src="{./img/icon-arrow.svg}" />'
})

export const Logo = Template.bind({})
export const arrow = Template2.bind({})
