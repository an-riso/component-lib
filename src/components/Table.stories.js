import VueTable from './table/VueTable.vue'

import data from './data.json'
import { computed, ref, watch } from 'vue'

const headers = ['id', 'name', 'DOB', 'course', 'department', 'fees paid']
const keyValues = ['id', 'name', 'date_of_birth', 'course', 'department', 'fees_paid']

const itemsPerPage = 8
const loading = ref(false)

const pageCount = Math.ceil(data.length / itemsPerPage)

export default {
  title: 'Components/Table',
  component: VueTable,
  argTypes: {
    headers: { control: 'string[]' },
    data: { control: 'any[]' },
    keys: { control: 'string[]' },
    loading: { control: 'boolean' },
    viewPaginator: { control: 'boolean' },
    pageCount: { control: 'number' }
  }
}

const Template = (args) => ({
  components: { VueTable },
  setup: () => ({ args }),
  template:
    '<div style="width: 100%; position: absolute; left: 0; right: 0; margin: 0 auto; margin-top: 2%; "><VueTable v-bind="args">{{ args.default }}</VueTable> </div>'
})

export const Base = Template.bind({})
Base.args = {
  headers: headers,
  keys: keyValues,
  data: data,
  loading: loading,
  viewPaginator: false
}

export const Paginator = Template.bind({})
Paginator.args = {
  headers: headers,
  keys: keyValues,
  data: data,
  loading: loading,
  viewPaginator: true,
  pageCount: pageCount
}
