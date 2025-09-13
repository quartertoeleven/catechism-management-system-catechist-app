<template>
  <q-page-container style="padding-bottom: 5rem; padding-top: 0rem !important">
    <router-view />
  </q-page-container>

  <q-tabs class="bg-primary text-white shadow-2 fixed-bottom" style="z-index: 1">
    <q-route-tab :to="`/units/${currentUnitCode}`" icon="info" label="Thông tin" />
    <q-route-tab :to="`/units/${currentUnitCode}/students`" icon="list" label="Học viên" />
    <q-route-tab
      :to="`/units/${currentUnitCode}/attendance-check`"
      icon="schedule"
      label="Điểm danh lớp"
    />
  </q-tabs>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from 'stores/app-store'

const router = useRouter()
const appStore = useAppStore()
const { setPageTitle } = appStore
setPageTitle('Vào Đời 1A')

const currentUnitCode = router.currentRoute.value.params.id
</script>
