import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login as LoginAPI } from '../services/auth-service'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const setIsAuthenticated = (value) => {
    isAuthenticated.value = value
  }

  const login = async (login_id, password) => {
    try {
      await LoginAPI(login_id, password)
      setIsAuthenticated(true)
    } catch (error) {
      const { data } = error.response
      console.log(data.message)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
})
