<template>
  <div class="q-pa-none">
    <q-list bordered padding>
      <q-item-label header>Tài khoản</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Thông tin tài khoản</q-item-label>
          <q-item-label caption> Xem và thay đổi thông tin tài khoản </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Đổi mật khẩu</q-item-label>
          <q-item-label caption> Thay đổi mật khẩu đăng nhập ứng dụng </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item-label header>Ứng dụng</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Xem thông tin</q-item-label>
          <q-item-label caption> Xem thông tin về ứng dụng và nhà phát triển</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Phiên bản</q-item-label>
        </q-item-section>
        <q-item-section side>
          {{ appVersion }}
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item>
        <q-item-section>
          <q-btn color="negative" label="Đăng xuất" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from 'stores/app-store'
import { onMounted } from 'vue'

const appStore = useAppStore()
const { setPageSubtitle, setPageTitle } = appStore
const { appVersion } = storeToRefs(appStore)

onMounted(() => {
  setPageTitle('Cài đặt')
  setPageSubtitle('')
})
</script>
