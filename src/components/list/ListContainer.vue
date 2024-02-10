<template>
  <div class="mt-6 flex flex-col gap-6 items-start">
    <search-input />
    <app-list :list="skuList" />
  </div>
</template>

<script setup>
import SearchInput from './SearchInput.vue'
import AppList from './AppList.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const skuList = computed(() => store.state.sales.skuList)
</script>
