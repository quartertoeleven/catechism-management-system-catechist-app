<template>
  <div class="window-height flex column flex-center fixed-center" style="width: 75vw">
    <div class="text-center q-mb-xl">
      <h1 class="text-h4 text-weight-bold q-mb-sm">QUẢN LÝ GIÁO LÝ</h1>
      <p>Ứng dụng dành cho Giáo Lý Viên</p>
    </div>
    <div class="full-width">
      <q-form class="q-gutter-y-md" @submit="handleLogin">
        <q-input
          v-model.trim="loginFormData.username"
          class="full-width"
          outlined
          label="ID đăng nhập"
        />
        <q-input
          v-model="loginFormData.password"
          class="full-width"
          outlined
          label="Mật khẩu"
          type="password"
        />
        <div class="">
          <q-btn class="full-width" type="submit" color="primary" label="Đăng nhập" no-caps />
        </div>
      </q-form>
    </div>
    <div class="q-mt-xl full-width text-center text-caption">
      <div>Phát triển bởi <span class="text-weight-bold">Quarter To Eleven</span></div>
      <sub
        >Phiên bản <span class="text-weight-bold">{{ appVersion }}</span></sub
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useAppStore } from 'src/stores/app-store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const { appVersion } = storeToRefs(appStore)
const { login } = authStore

const loginFormData = ref({
  username: '',
  password: '',
})

const handleLogin = async () => {
  await login(loginFormData.value.username, loginFormData.value.password)
  router.push({ name: 'home' })
}
</script>
