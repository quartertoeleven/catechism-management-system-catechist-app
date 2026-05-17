<template>
  <div class="bg-grey-1">
    <div class="window-height flex column flex-center fixed-center" style="width: 75vw">
      <div class="text-center q-mb-xl">
        <h1 class="text-h5 text-weight-bold q-mb-sm">
          ỨNG DỤNG DÀNH CHO <br />
          GIÁO LÝ VIÊN
        </h1>
        <p class="text-subtitle">Hệ thống Quản Lý Giáo Lý - Thiếu Nhi Tam Hà</p>
      </div>
      <div class="q-mb-lg">
        <q-spinner size="2rem" />
      </div>
      <div class="full-width text-center">Đang xử lý...</div>
      <div class="q-mt-xl full-width text-center text-caption">
        <div>Phát triển bởi <span class="text-weight-bold">Quarter To Eleven</span></div>
        <sub
          >Phiên bản <span class="text-weight-bold">{{ appVersion }}</span></sub
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHandleSignInCallback, useLogto } from '@logto/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useAppStore } from 'src/stores/app-store'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const { getAccessToken, getIdToken, getIdTokenClaims, fetchUserInfo } = useLogto()

const { appVersion } = storeToRefs(appStore)
const { login } = authStore

useHandleSignInCallback(async () => {
  // Do something when finished, e.g. redirect to home page
  const accessToken = await getAccessToken(process.env.API_BASE_URL)
  const idToken = await getIdToken()
  const idTokenClaims = await getIdTokenClaims()
  const userInfo = await fetchUserInfo()

  console.log('this is the access token', accessToken)
  console.log('this is the id token', idToken)
  console.log('this is the id token claims', idTokenClaims)
  console.log('this is the user info', userInfo)
  router.push({ name: 'home' })
})

console.log(login)
</script>
