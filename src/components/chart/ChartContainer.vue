<template>
  <div>
    <div class="flex justify-between mb-8">
      <h2>Daily Sales</h2>
      <select :value="selectedDays" @change="setSelectedDays" class="outline-none">
        <option v-for="day in days" :key="day" :value="day">
          {{ `Last ${day} Days` }}
        </option>
      </select>
    </div>
    <div v-if="!props.isFetching">
      <app-chart v-if="dailySales.length > 0" :sales="store.state.sales" />
    </div>
    <div v-else class="flex justify-center">
      <app-spinner />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AppChart from './AppChart.vue'
import AppSpinner from '../shared/AppSpinner.vue'
import { useStore } from 'vuex'
const store = useStore()
const emits = defineEmits(['fetch-chart'])
const props = defineProps({ isFetching: Boolean })

const dailySales = computed(() => store.state.sales.dailySales)
const days = ref([60, 30, 14, 7])
const selectedDays = computed(() => store.state.sales.selectedDays)
const setSelectedDays = (e) => {
  store.dispatch('sales/setSelectedDays', e.target.value)
}
watch(
  selectedDays,
  (days) => {
    emits('fetch-chart', days)
  },
  { immediate: true }
)
</script>
