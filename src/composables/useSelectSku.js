import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { getSkuListApi, getSkuRefundRateApi } from '@/lib/services'

export const useSelectSku = () => {
  const store = useStore()
  const selectedSkuDate = computed(() => store.state.sales.selectedSkuDate)
  watch(
    selectedSkuDate,
    async (dateArray) => {
      const [firstDate = '', secondDate = ''] = dateArray
      let dataWithDate
      if (dateArray.length === 0) {
        dataWithDate = {}
      } else {
        const skuData = {
          marketplace: store.state.auth.user.store[0].marketplaceName,
          sellerId: store.state.auth.user.store[0].storeId,
          salesDate: firstDate,
          salesDate2: secondDate,
          pageSize: 30,
          pageNumber: 1,
          isDaysCompare: dateArray.length === 2 ? 1 : 0
        }
        const { Data } = await getSkuListApi(store.state.auth.token, skuData)
        const skuList = Data.item.skuList
        const refundListData = {
          marketplace: store.state.auth.user.store[0].marketplaceName,
          sellerId: store.state.auth.user.store[0].storeId,
          skuList,
          requestedDay: 0
        }
        const { Data: refundData } = await getSkuRefundRateApi(
          store.state.auth.token,
          refundListData
        )
        dataWithDate = { data: [...refundData], firstDate, secondDate }
      }
      store.dispatch('sales/setSkuList', dataWithDate)
    },
    { deep: true }
  )

  const selectSku = async (date) => {
    const dates = checkArray(selectedSkuDate.value, date)
    store.dispatch('sales/setSelectedSku', dates)

    const dailySales = computed(() => store.state.sales.dailySales)
    const [firstDate, secondDate] = selectedSkuDate.value
    const firstIndex = dailySales.value.findIndex((sale) => sale.date === firstDate)
    const secondIndex = dailySales.value.findIndex((sale) => sale.date === secondDate)

    const elFba = document.querySelectorAll('.highcharts-series-1 .highcharts-point')
    for (var item of elFba) {
      item.classList.remove('fill-green-500')
      item.classList.remove('fill-teal-500')
    }
    elFba[firstIndex]?.classList.add('fill-green-500')
    elFba[secondIndex]?.classList.add('fill-teal-500')
  }
  return { selectSku }
}

const checkArray = (arr, item) => {
  if (arr.length === 2) {
    if (arr.includes(item)) {
      return arr.filter((value) => value !== item)
    } else {
      arr.shift()
      arr.push(item)
      return arr
    }
  } else {
    if (arr.includes(item)) {
      return []
    } else {
      arr.push(item)
      return arr
    }
  }
}
