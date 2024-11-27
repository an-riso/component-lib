import type { Meta, StoryObj } from '@storybook/vue3'
import VueTable from '../components/table/AppVueTable.vue'
//@ts-ignore
import data from './ts/data.json'

const headers = ['id', 'name', 'DOB', 'course', 'department', 'fees paid']
const keyValues = ['id', 'name', 'date_of_birth', 'course', 'department', 'fees_paid']
const columnSortItems = ['name', 'date_of_birth', 'course', 'department']

const itemsPerPage = 8

const pageCount = Math.ceil(data.length / itemsPerPage)

const meta = {
  title: 'TODO/Table',
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
    loading: false,
    viewPaginator: false
  }
}

export const Paginator: Story = {
  args: {
    headers: headers,
    keys: keyValues,
    columnSort: columnSortItems,
    data: data,
    loading: false,
    viewPaginator: true,
    pageCount: pageCount
  }
}
