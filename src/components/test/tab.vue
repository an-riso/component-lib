<template>
  <div class="overflow-x-auto">
    <button @click="downloadPdf" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Download PDF</button>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <input type="checkbox" @change="toggleAll" :checked="allSelected" />
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in items" :key="item.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <input type="checkbox" v-model="selectedItems" :value="item.id" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
          <!-- Add more columns as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface Item {
  id: number
  name: string
  email: string
}

const items = ref<Item[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  // Add more items as needed
])

const selectedItems = ref<number[]>([])

const allSelected = computed(() => {
  return items.value.length > 0 && selectedItems.value.length === items.value.length
})

const toggleAll = () => {
  if (allSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = items.value.map((item) => item.id)
  }
}

const downloadPdf = () => {
  const doc = new jsPDF()
  const selectedData = items.value.filter((item) => selectedItems.value.includes(item.id))

  const tableColumn = ['Name', 'Email']
  const tableRows = []

  selectedData.forEach((item) => {
    const itemData = [item.name, item.email]
    tableRows.push(itemData)
  })

  doc.autoTable({
    head: [tableColumn],
    body: tableRows
  })

  doc.save('selected_rows.pdf')
}
</script>

<style scoped>
/* Add any additional styling needed */
</style>
