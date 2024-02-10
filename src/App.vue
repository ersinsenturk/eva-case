<template>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const isLoggedIn = computed(() => store.getters['auth/isAuthenticated'])
watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'login' })
  }
})
</script>
