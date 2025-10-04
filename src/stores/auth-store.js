import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login as LoginAPI, getAuth } from '../services/auth-service'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const setIsAuthenticated = (value) => {
    isAuthenticated.value = value
  }

  const login = async (login_id, password) => {
    await LoginAPI(login_id, password)
    setIsAuthenticated(true)
  }

  const getAuthState = async () => {
    try {
      await getAuth()
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    login,
    getAuthState,
    logout,
  }
})
