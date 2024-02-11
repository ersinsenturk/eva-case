<template>
  <div class="max-w-xl mx-auto mt-6">
    <app-card>
      <h2 class="mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-input" v-model="formData.email" required />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-input"
            v-model="formData.password"
            required
          />
        </div>
        <button class="form-button" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Submit' }}
        </button>
        <div class="text-red-500" v-if="errorText">{{ errorText }}</div>
      </form>
    </app-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { fetchUserApi, getTokenApi } from '@/lib/services'
const store = useStore()

const formData = reactive({
  email: 'homework@eva.guru',
  password: 'Homeworkeva1**'
})
const isLoading = ref(false)
const errorText = ref(null)
const handleLogin = async () => {
  isLoading.value = true
  try {
    const token = await getTokenApi(formData)
    const user = await fetchUserApi(token, formData.email)
    store.dispatch('auth/loginUser', { token, user })
  } catch (error) {
    errorText.value = error
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
