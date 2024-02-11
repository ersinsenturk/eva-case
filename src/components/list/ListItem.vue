<template>
  <div class="grid grid-cols-12 gap-4 p-4 items-center font-semibold bg-white even:bg-gray-100">
    <div class="col-span-2">{{ item.sku.sku }}</div>
    <div class="col-span-6">{{ item.sku.productName }}</div>
    <div class="col-span-3 grid text-right relative" :class="{ 'grid-cols-2': isSecondDateSet }">
      <div class="col-span-1 text-green-500">
        {{ currency }}{{ totalSalesFirst }} / {{ item.sku.qty }}<br />
        {{ currency }}{{ item.sku.amount }}
      </div>
      <div class="col-span-1 text-teal-500" v-if="isSecondDateSet">
        {{ currency }}{{ totalSalesSecond }} / {{ item.sku.qty2 }}<br />
        {{ currency }}{{ item.sku.amount2 }}
      </div>
      <span v-if="salesCompareIcon" class="absolute -right-6 top-0 bottom-0 flex items-center">
        <v-icon :name="salesCompareIcon" :class="salesCompareClass" />
      </span>
    </div>
    <div class="col-span-1 text-right">{{ item.refundRate.toFixed(2) }}%</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { item, isSecondDateSet, currency } = defineProps({
  item: Object,
  isSecondDateSet: Boolean,
  currency: String
})
const totalSalesFirst = computed(() => (item.sku.amount * item.sku.qty).toFixed(2))
const totalSalesSecond = computed(() => (item.sku.amount2 * item.sku.qty2).toFixed(2))
const salesCompareIcon = computed(() => {
  if (isSecondDateSet) {
    return Number(totalSalesFirst.value) < Number(totalSalesSecond.value)
      ? 'md-keyboardarrowup-round'
      : 'md-keyboardarrowdown-round'
  }
  return false
})
const salesCompareClass = computed(() => {
  if (isSecondDateSet) {
    return Number(totalSalesFirst.value) < Number(totalSalesSecond.value)
      ? 'fill-green-500'
      : 'fill-red-500'
  }
  return false
})
</script>
