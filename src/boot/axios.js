import { defineBoot } from '#q-app/wrappers'
import { Notify, Loading } from 'quasar'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth-store'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_BASE_URL, withCredentials: true })

export default defineBoot(({ app, store, router }) => {
  const authStore = useAuthStore(store)

  api.interceptors.request.use(
    (config) => {
      Loading.show()
      return config
    },
    (error) => {
      Loading.hide()
      return Promise.reject(error)
    },
  )

  api.interceptors.response.use(
    (response) => {
      console.log(app)
      Loading.hide()
      return response
    },
    (error) => {
      Loading.hide()
      if (error.code === 'ERR_NETWORK') {
        Notify.create({
          type: 'negative',
          message: 'Internal server error',
          position: 'top-right',
          group: false,
          timeout: 4000,
          progress: true,
        })
        return Promise.reject(error)
      }
      if (error.response.status === 401) {
        authStore.isAuthenticated = false
        if (!router.currentRoute.value.name) {
          return Promise.reject(error)
        }
      }
      if (router.currentRoute.value.name) {
        Notify.create({
          type: 'negative',
          message: error.response?.data.message || 'Internal server error',
          position: 'top-right',
          group: false,
          timeout: 4000,
          progress: true,
        })
      }
      return Promise.reject(error)
    },
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
