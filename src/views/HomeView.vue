<template>
  <RouterLink :to="{ name: 'login' }">Login</RouterLink>
  <button @click="handleLogout">Logout</button>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const handleLogout = () => {
  store.dispatch('auth/logoutUser', store.state.auth.token)
}
</script>
