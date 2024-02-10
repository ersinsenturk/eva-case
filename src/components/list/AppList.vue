<template>
  <div class="basis-full flex-1 w-full">
    <list-item v-for="item in list" :key="item" :item="item" />
  </div>
</template>

<script setup>
import ListItem from './ListItem.vue'
const { list } = defineProps({ list: Object })
</script>
