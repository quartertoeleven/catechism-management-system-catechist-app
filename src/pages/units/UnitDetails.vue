<template>
  <div class="">
    <div class="">
      <!-- <q-tabs v-model="tab" class="text-teal">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" inline-label class="bg-purple text-white shadow-2">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" no-caps class="bg-orange text-white shadow-2">
        <q-tab name="mails" label="Mails" />
        <q-tab name="alarms" label="Alarms" />
        <q-tab name="movies" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" class="bg-teal text-yellow shadow-2">
        <q-tab name="mails" icon="mail" />
        <q-tab name="alarms" icon="alarm" />
        <q-tab name="movies" icon="movie" />
      </q-tabs> -->

      <q-tabs class="bg-primary text-white shadow-2 fixed-bottom" style="z-index: 1">
        <q-route-tab :to="`/units/${currentUnitCode}`" icon="info" label="Thông tin" />
        <q-route-tab :to="`/units/${currentUnitCode}/students`" icon="list" label="Học viên" />
        <q-route-tab
          :to="`/units/${currentUnitCode}/attendance-check`"
          icon="schedule"
          label="Điểm danh lớp"
        />
      </q-tabs>

      <router-view style="margin-bottom: 5rem" />
    </div>
  </div>
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
