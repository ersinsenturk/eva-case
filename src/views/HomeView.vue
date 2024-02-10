<template>
  <AppHeader />
  <main class="p-4">
    <app-card>
      <chart-container @fetch-chart="fetchChart" />
    </app-card>
  </main>
</template>
<script setup>
import AppHeader from '@/components/shared/AppHeader.vue'
import ChartContainer from '@/components/chart/ChartContainer.vue'
import { useStore } from 'vuex'
import { getDailySalesApi } from '@/lib/services'
const store = useStore()

const fetchChart = async (day) => {
  const dailySales = {
    marketplace: store.state.auth.user.store[0].marketplaceName,
    sellerId: store.state.auth.user.store[0].storeId,
    requestStatus: 0,
    day,
    excludeYoYData: true
  }

  const { Data } = await getDailySalesApi(store.state.auth.token, dailySales)
  const { item: sales, Currency: currency } = Data
  console.log(Data)
  store.dispatch('sales/setDailySales', { sales, currency })
}
</script>
