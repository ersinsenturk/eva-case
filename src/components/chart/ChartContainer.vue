<template>
  <div>
    <div class="flex justify-between mb-8">
      <h2>Daily Sales</h2>
      <select v-model="selectedDays" class="outline-none">
        <option v-for="day in days" :key="day" :value="day">
          {{ `Last ${day} Days` }}
        </option>
      </select>
    </div>
    <app-chart v-if="dailySales.length > 0" :sales="store.state.sales" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AppChart from './AppChart.vue'
import { useStore } from 'vuex'
const store = useStore()
const emits = defineEmits(['fetch-chart'])

const dailySales = computed(() => store.state.sales.dailySales)
const days = ref([60, 30, 14, 7])
const selectedDays = ref(7)
watch(
  selectedDays,
  (days) => {
    emits('fetch-chart', days)
  },
  { immediate: true }
)
</script>
