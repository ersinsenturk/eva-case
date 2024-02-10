import { computed, reactive } from 'vue'
import formatDate from '@/lib/formatDate'
import { useSelectSku } from './useSelectSku'

export const useChartOptions = (sales) => {
  const dailySales = computed(() => sales.dailySales)
  const currency = computed(() => sales.currency)
  const fbaAmounts = computed(() => dailySales.value.map((sale) => sale.fbaAmount))
  const fbmAmounts = computed(() => dailySales.value.map((sale) => sale.fbmAmount))
  const profits = computed(() => dailySales.value.map((sale) => sale.profit))
  const shippingAmounts = computed(() => dailySales.value.map((sale) => sale.shippingAmount))
  const xAxisDates = computed(() => dailySales.value.map((sale) => sale.date))

  const { selectSku } = useSelectSku()

  const chartOptions = reactive({
    chart: {
      type: 'column'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
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
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            const date = event.point.category
            selectSku(date)
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
      categories: xAxisDates,
      labels: {
        formatter: function () {
          return formatDate(this.value)
        },
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
      shared: true,
      formatter: function () {
        const index = this.point.index
        return `<b>${formatDate(this.x)}</b></br>
          <b>Total Sales: </b>${currency.value}${fbaAmounts.value[index] + fbmAmounts.value[index]}</br>
          <b>Shipping: </b>${currency.value}${shippingAmounts.value[index]}</br>
          <b>Profit: </b>${currency.value}${profits.value[index]}</br>
          <b>FBA Sales: </b>${currency.value}${fbaAmounts.value[index]}</br>
          <b>FBM Sales: </b>${currency.value}${fbmAmounts.value[index]}`
      }
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
        data: fbaAmounts
      },
      {
        name: 'FBM Sales',
        color: '#3300cc',
        data: fbmAmounts
      }
    ]
  })

  return { chartOptions }
}
