<template>
  <AppHeader />
  <main class="p-4">
    <app-card>
      <chart-container @fetch-chart="fetchChart" />
    </app-card>
    <list-container />
  </main>
</template>
<script setup>
import { useStore } from 'vuex'
// import { computed, watch } from 'vue'
import AppHeader from '@/components/shared/AppHeader.vue'
import ChartContainer from '@/components/chart/ChartContainer.vue'
import ListContainer from '@/components/list/ListContainer.vue'

import { getDailySalesApi } from '@/lib/services'
const store = useStore()

const fetchChart = async (day) => {
  const dailySalesUser = {
    marketplace: store.state.auth.user.store[0].marketplaceName,
    sellerId: store.state.auth.user.store[0].storeId,
    requestStatus: 0,
    day,
    excludeYoYData: true
  }
  const { Data } = await getDailySalesApi(store.state.auth.token, dailySalesUser)
  const { item: sales, Currency: currency } = Data
  store.dispatch('sales/setDailySales', { sales, currency })
  store.dispatch('sales/setSkuList', {})
  store.dispatch('sales/setSelectedSku', [])
  store.dispatch('sales/searchSku', '')
}
</script>
