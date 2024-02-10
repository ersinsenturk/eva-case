<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
import { Chart as highcharts } from 'highcharts-vue'
import { useChartOptions } from '@/composables/useChartOptions'
const { sales } = defineProps({ sales: Object })

const { chartOptions } = useChartOptions(sales)
</script>

<style lang="scss" scoped></style>
