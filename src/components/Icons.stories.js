import SvgLogo from './img/logo.svg'

export default {
  title: 'Test/Icons',
  component: SvgLogo,
  argTypes: {}
}

const Template = () => ({
  components: { SvgLogo },
  template: '<img src="{./img/icon-arrow.svg}" />'
})

export const Logo = Template.bind({})
