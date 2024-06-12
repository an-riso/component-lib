import type { Meta, StoryObj } from '@storybook/vue3'
import VueTable from './table/AppVueTable.vue'

import data from './data.json'
import { ref } from 'vue'

const headers = ['id', 'name', 'DOB', 'course', 'department', 'fees paid']
const keyValues = ['id', 'name', 'date_of_birth', 'course', 'department', 'fees_paid']
const columnSortItems = ['name', 'date_of_birth', 'course', 'department']

const itemsPerPage = 8
const loading = ref(false)

const pageCount = Math.ceil(data.length / itemsPerPage)

const meta = {
  title: 'Oversonic components/Table',
  component: VueTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    viewPaginator: { control: 'boolean' },
    pageCount: { control: 'number' }
  }
} satisfies Meta<typeof VueTable>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    headers: headers,
    keys: keyValues,
    columnSort: columnSortItems,
    data: data,
    loading: loading,
    viewPaginator: false
  }
}

export const Paginator: Story = {
  args: {
    headers: headers,
    keys: keyValues,
    columnSort: columnSortItems,
    data: data,
    loading: loading,
    viewPaginator: true,
    pageCount: pageCount
  }
}
