<script setup lang="ts">
import Spinner from './Spinner.vue'
import VuePaginator from './paginator/VuePaginator.vue'

import { computed, ref, watch } from 'vue'

withDefaults(
  defineProps<{
    headers: string[]
    data: any[]
    keys: string[]
    viewPaginator: boolean
    noDataMessage: string
    loading: boolean
    pageCount?: number
    columnSort: string[]
  }>(),
  {
    loading: false,
    viewPaginator: false,
    noDataMessage: 'No data available'
  }
)

const reduceObject = (obj: any, path: string[]) => {
  return path.reduce((prev, key) => {
    return prev?.[key]
  }, obj)
}

const itemsPerPage = 8
const startOffSet = ref(0)
const endOffSet = ref(startOffSet.value + itemsPerPage)

watch(startOffSet, (nOff) => {
  endOffSet.value = startOffSet.value + itemsPerPage
})

const currentData = computed(() => (data: any[]) => data.slice(startOffSet.value, endOffSet.value))

const lengthData = computed(() => (data: any[]) => data.length)

function onPageChange(pageNumber: number) {
  const newOffSet = (pageNumber - 1) * itemsPerPage
  startOffSet.value = newOffSet
}

let ascending = false
let sortColumn = ''

function sortTable(col: any, data: any[], columnSort: string[]) {
  console.log('sortTable', col, data, columnSort.includes(col))
  if (columnSort.includes(col)) {
    if (sortColumn === col) {
      ascending = !ascending
    } else {
      ascending = true
      sortColumn = col
    }

    // var ascending = ascending

    data.sort(function (a, b) {
      if (a[col] > b[col]) {
        return ascending ? 1 : -1
      } else if (a[col] < b[col]) {
        return ascending ? -1 : 1
      }
      return 0
    })
  }
}
</script>

<template>
  <div class="relative overflow-x-auto" :class="{ 'shadow-md': !viewPaginator }">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase">
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            scope="col"
            class="px-6 py-3 hover:cursor-pointer"
            @click="sortTable(keys[i], data, columnSort)"
          >
            {{ header }}

            <button v-if="keys[i] == sortColumn" class="text-black">
              <img :key="i" v-if="ascending" src="../img/icon-arrow.svg" alt="Sort" class="h-3 w-3" />
              <img
                :key="i"
                v-if="!ascending"
                src="../img/icon-arrow.svg"
                alt="Sort"
                class="h-3 w-3"
                style="transform: rotate(-180deg)"
              />
            </button>
          </th>
          <slot name="th"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-if="viewPaginator ? lengthData(currentData(data)) < 1 : data.length < 1">
          <td :colspan="headers.length" class="align-center">
            <div class="flex justify-center p-4">
              <Spinner v-if="loading" />
              <p v-else>{{ noDataMessage }}</p>
            </div>
          </td>
        </tr>
        <tr
          v-else
          class="bg-white border-t hover:bg-gray-50"
          v-for="(item, i) in viewPaginator ? currentData(data) : data"
          :key="i"
        >
          <td v-for="(key, i) in keys" :key="i" class="px-6 py-4">
            <span v-if="typeof key === 'object'">
              {{ reduceObject(item, key) }}
            </span>
            <span v-else>{{ item[key] }}</span>
          </td>
          <slot name="td" :item="item"></slot>
        </tr>
      </tbody>
    </table>
  </div>
  <VuePaginator v-if="viewPaginator" :pageCount="pageCount" v-on:onPageChange="onPageChange" />
</template>
