import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login as LoginAPI, getAuth, logout as LogoutAPI } from '../services/auth-service'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const currentUser = ref({})

  const setIsAuthenticated = (value) => {
    isAuthenticated.value = value
  }

  const setCurrentUser = (value) => {
    currentUser.value = value
  }

  const login = async (login_id, password) => {
    await LoginAPI(login_id, password)
    await getAuthState()
  }

  const getAuthState = async () => {
    try {
      const result = await getAuth()
      setCurrentUser(result.data.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    await LogoutAPI()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    getAuthState,
    logout,
  }
})
