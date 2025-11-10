import { ref } from 'vue'
import { defineStore } from 'pinia'

import { login as LoginAPI, getAuth, logout as LogoutAPI, loginSSO } from '../services/auth-service'
import { changeAccountPassword } from '../services/user-profile-service'

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

  const changePassword = async (current_password, new_password, confirm_password) => {
    const changePasswordBody = {
      current_password,
      new_password,
      confirm_password,
    }
    await changeAccountPassword(changePasswordBody)
    await LogoutAPI()
    setIsAuthenticated(false)
  }

  const authenticateWithSSO = async (loginIdToken) => {
    await loginSSO(loginIdToken)
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    getAuthState,
    logout,
    changePassword,
    authenticateWithSSO,
  }
})
