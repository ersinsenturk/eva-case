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
        <button class="form-button">Submit</button>
      </form>
    </app-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const formData = reactive({
  email: 'homework@eva.guru',
  password: 'Homeworkeva1**',
  GrantType: 'password',
  Scope: 'amazon_data',
  ClientId: 'C0001',
  ClientSecret: 'SECRET0001',
  RedirectUri: 'https://api.eva.guru'
})
const handleLogin = () => {
  store.dispatch('auth/loginUser', formData)
}
</script>

<style lang="scss" scoped></style>
