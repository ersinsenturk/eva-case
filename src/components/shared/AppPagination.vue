<template>
  <div class="flex justify-end w-full">
    <ul class="flex gap-2 items-center p-1 bg-gray-300 rounded-full">
      <li>
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          class="disabled:text-gray-400"
        >
          <v-icon name="md-keyboardarrowleft-round" />
        </button>
      </li>

      <li v-for="page in pages" :key="page.name">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          class="rounded-full px-2"
          :class="{ 'bg-blue-800 text-white': isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>

      <li>
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          class="disabled:text-gray-400"
        >
          <v-icon name="md-keyboardarrowright-round" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ currentPage: Number, totalPages: Number })
const emits = defineEmits(['page-changed'])

const isInFirstPage = computed(() => props.currentPage === 1)
const isInLastPage = computed(() => props.currentPage === props.totalPages)

const onClickPreviousPage = () => {
  emits('page-changed', props.currentPage - 1)
}
const onClickPage = (page) => {
  emits('page-changed', page)
}
const onClickNextPage = () => {
  emits('page-changed', props.currentPage + 1)
}
const isPageActive = (page) => {
  return props.currentPage === page
}

const pages = computed(() => {
  const pageNumbers = []
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }
  return pageNumbers
})
</script>

<style lang="scss" scoped></style>
