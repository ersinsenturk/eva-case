<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { Chart as highcharts } from 'highcharts-vue'

const store = useStore()
const dailySales = computed(() => store.state.sales.dailySales)
const currency = computed(() => store.state.sales.currency)
const fbaAmounts = computed(() => dailySales.value.map((sale) => sale.fbaAmount))
const fbmAmounts = computed(() => dailySales.value.map((sale) => sale.fbmAmounts))
const profits = computed(() => dailySales.value.map((sale) => sale.profit))
const xAxisDates = computed(() => dailySales.value.map((sale) => sale.date))

const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})
const formattedDates = computed(() =>
  xAxisDates.value.map((dateString) => {
    const date = new Date(dateString)
    return formatter.format(date)
  })
)

const chartOptions = reactive({
  chart: {
    type: 'column'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true
      }
    },
    series: {
      cursor: 'pointer',

      events: {
        click: function (event) {
          console.log(this)
          event.target.classList.add('fill-red-500')
        }
      }
    }
  },
  accessibility: {
    enabled: false
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: formattedDates.value,
    labels: {
      style: {
        fontSize: '10px',
        fontWeight: 'bold'
      }
    }
  },
  yAxis: {
    title: {
      text: `Amount (${currency.value})`
    },
    min: 0,
    tickInterval: 1000
  },
  tooltip: {
    shared: true
  },
  series: [
    {
      name: 'Profit',
      color: '#66ffcc',
      data: profits,
      dataLabels: {
        enabled: false
      }
    },
    {
      name: 'FBA Sales',
      color: '#9999ff',
      data: fbaAmounts,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'center',
        format: `${currency.value} {point.y}`,
        style: {
          fontSize: '10px'
        }
      }
    },
    {
      name: 'FBM Sales',
      color: '#3300cc',
      data: fbmAmounts,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'center',
        format: `${currency.value} {point.y}`,
        style: {
          fontSize: '10px'
        }
      }
    }
  ]
})
</script>

<style lang="scss" scoped></style>
