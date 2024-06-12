<script setup lang="ts">
import VueTable from './components/table/AppVueTable.vue'
import data from '../src/components/data.json'
import './static/custom-style.css'
import { ref } from 'vue'

const headers = ['id', 'name', 'DOB', 'course', 'department', 'fees paid']
const keyValues = ['id', 'name', 'date_of_birth', 'course', 'department', 'fees_paid']

const itemsPerPage = 8

const loading = ref(false)
const paginator = ref(true)

const pageCount = Math.ceil(data.length / itemsPerPage)
</script>

<template>
  <div style="width: 100%; position: absolute; left: 0; right: 0; margin: 0 auto; margin-top: 2%">
    <VueTable
      :headers="headers"
      :keys="keyValues"
      :data="data"
      :loading="loading"
      :page-count="pageCount"
      :viewPaginator="paginator"
    >
      <!--template #th>
        <th>Actions</th>
      </template>
      <template #td="{ item }">
        <td class="flex">
          <button @click="console.log('item')">@</button>
        </td>
      </template-->
    </VueTable>
  </div>
</template>
