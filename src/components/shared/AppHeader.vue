<template>
  <header class="flex justify-end items-center gap-8 p-4">
    <span>{{ fullName }}</span>
    <button class="form-button" @click="handleLogout">Logout</button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const handleLogout = () => {
  store.dispatch('auth/logoutUser', store.state.auth.token)
}
const fullName = computed(
  () => `${store.state.auth.user?.firstName} ${store.state.auth.user?.lastName}`
)
</script>
