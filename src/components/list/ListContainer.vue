<template>
  <div class="mt-6 flex flex-col gap-6 items-start" v-if="filteredSkuList">
    <search-input />
    <app-list
      v-if="filteredSkuList.length > 0"
      :list="pagingSkuList"
      :firstDate="skuList.firstDate"
      :secondDate="skuList.secondDate"
    />
    <div v-else class="font-semibold">There is no matching SKU</div>
    <app-pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="onPageChange"
    />
  </div>
</template>

<script setup>
import SearchInput from './SearchInput.vue'
import AppList from './AppList.vue'
import AppPagination from '@/components/shared/AppPagination.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const skuList = computed(() => store.state.sales.skuList)
const filteredSkuList = computed(() => store.getters['sales/getFilteredSku'])
const pagingSkuList = computed(() =>
  filteredSkuList.value.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  )
)

const currentPage = ref(1)
const perPage = ref(10)
const totalPages = computed(() => Math.ceil(filteredSkuList.value.length / perPage.value))
const onPageChange = (page) => (currentPage.value = page)
</script>
