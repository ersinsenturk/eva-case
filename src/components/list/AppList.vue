<template>
  <div class="w-full">
    <div class="grid grid-cols-12 gap-4 p-4 items-center font-semibold bg-white">
      <div class="col-span-2">SKU</div>
      <div class="col-span-6">Product Name</div>
      <div class="col-span-3 grid text-right" :class="{ 'grid-cols-2': isSecondDateSet }">
        <div class="col-span-1">
          {{ formatDate(props.firstDate) }}<br />
          Sales / Units<br />
          Avg. Selling Price
        </div>
        <div class="col-span-1" v-if="isSecondDateSet">
          {{ formatDate(props.secondDate) }}<br />
          Sales / Units<br />
          Avg. Selling Price
        </div>
      </div>
      <div class="col-span-1 text-right">
        SKU Refund Rate <span class="block text-sm">(Last {{ selectedDays }} days)</span>
      </div>
    </div>
    <list-item
      v-for="item in props.list"
      :key="item"
      :item="item"
      :isSecondDateSet="isSecondDateSet"
      :currency="currency"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ListItem from './ListItem.vue'
import { useStore } from 'vuex'
import formatDate from '@/lib/formatDate'
const store = useStore()

const props = defineProps({
  list: Object,
  firstDate: String,
  secondDate: String
})

const isSecondDateSet = computed(() => props.secondDate !== '')
const selectedDays = computed(() => store.state.sales.selectedDays)
const currency = computed(() => store.state.sales.currency)
</script>
