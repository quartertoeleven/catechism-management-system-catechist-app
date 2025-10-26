<template>
  <div class="q-pa-md">
    <div class="full-width text-center q-mb-md">
      <div class="text-weight-bold text-h6">Ứng dụng Giáo Lý Viên</div>
      <div class="text-subtitle2">Hệ thống Quản Lý Giáo Lý - Thiếu Nhi Tam Hà</div>
      <div class="text-caption q-mt-sm">
        Phiên bản <b>{{ appVersion }}</b>
      </div>
    </div>

    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Về ứng dụng"
        header-class="text-center text-weight-bold"
        default-opened
        hide-expand-icon
      >
        <q-card class="text-body2 text-center">
          <q-card-section>
            <p>
              Đây là ứng dụng dành cho <b>Giáo Lý Viên</b>, là một phần của
              <b>Hệ Thống Quản Lý Giáo Lý</b>
              đang đuợc phát triển riêng cho Thiếu Nhi Giáo Xứ Tam Hà.
            </p>
            <p>
              Hệ thống đuợc tạo ra nhằm mục đích góp phần vào việc quản lý học sinh giáo lý trong
              giáo xứ một cách hiệu quả hiện đại hơn.
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Phát triển bởi"
        header-class="text-center text-weight-bold"
        default-opened
        hide-expand-icon
      >
        <q-card>
          <q-card-section>
            <div class="full-width text-center">
              <q-img src="~assets/images/quartertoeleven-logo.png" alt="" style="width: 70%" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from 'src/stores/app-store'
import { onMounted, onUnmounted } from 'vue'

const appStore = useAppStore()

const { appVersion } = storeToRefs(appStore)
const { setPageTitle, setNavigateBackPath } = appStore

onMounted(() => {
  setPageTitle('Thông tin ứng dụng')
  setNavigateBackPath('/settings')
})

onUnmounted(() => {
  setNavigateBackPath(null)
})
</script>
