<template>
  <div class="inline-block">
    <div class="flex items-center bg-white rounded-full p-2">
      <v-icon name="md-search-round" class="fill-gray-800" />
      <input
        type="text"
        class="outline-none text-sm w-64 px-2"
        v-model="searchValue"
        placeholder="Search SKU"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const searchValue = ref()
const store = useStore()
watch(searchValue, (value) => {
  store.dispatch('sales/searchSku', value)
})
</script>

<style lang="scss" scoped></style>
