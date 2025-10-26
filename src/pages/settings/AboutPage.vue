<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Về ứng dụng"
        header-class="text-center text-weight-bold"
        expand-icon="mdi-chevron-down"
        default-opened
      >
        <q-card>
          <q-card-section>
            <p>
              Đây là ứng dụng dành cho <b>Giáo Lý Viên</b>, là một phần của
              <b>Hệ Thống Quản Lý Giáo Lý</b>
              đang đuợc phát triển riêng cho Thiếu Nhi Giáo Xứ Tam Hà
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
        label="Thông tin nhà phát triển"
        header-class="text-center text-weight-bold"
        expand-icon="mdi-chevron-down"
        default-opened
      >
        <q-card>
          <q-card-section>
            <p>
              Đây là ứng dụng dành cho <b>Giáo Lý Viên</b>, là một phần của
              <b>Hệ Thống Quản Lý Giáo Lý</b>
              đang đuợc phát triển riêng cho Thiếu Nhi Giáo Xứ Tam Hà
            </p>
            <p>
              Hệ thống đuợc tạo ra nhằm mục đích góp phần vào việc quản lý học sinh giáo lý trong
              giáo xứ một cách hiệu quả hiện đại hơn.
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
import { useAppStore } from 'src/stores/app-store'
import { onMounted } from 'vue'

const appStore = useAppStore()

// const { appVersion } = storeToRefs(appStore)
const { setPageTitle } = appStore

onMounted(() => {
  setPageTitle('Thong tin ung dung')
})
</script>
