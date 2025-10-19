<template>
  <q-page-container style="padding-bottom: 5rem; padding-top: 0rem !important">
    <router-view />
  </q-page-container>

  <q-tabs class="bg-primary text-white shadow-2 fixed-bottom" style="z-index: 1">
    <!-- <q-route-tab :to="`/units/${unitDetails.code}`" icon="info" label="Thông tin" /> -->
    <q-route-tab :to="`/units/${unitDetails.code}/students`" icon="list" label="Học viên" />
    <q-route-tab
      :to="`/units/${unitDetails.code}/attendance-check`"
      icon="schedule"
      label="Điểm danh lớp"
    />
  </q-tabs>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from 'stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const router = useRouter()
const appStore = useAppStore()
const unitStore = useUnitStore()

const { unitDetails } = storeToRefs(unitStore)
const { setPageTitle } = appStore
const { resetUnitDetails } = unitStore

onMounted(async () => {
  resetUnitDetails()
  await unitStore.getSpecificUnitDetails(router.currentRoute.value.params.unit_code)
  setPageTitle(unitDetails.value.name)
})
</script>
