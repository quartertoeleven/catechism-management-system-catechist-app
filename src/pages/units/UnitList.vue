<template>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item-label header>Lớp của tôi</q-item-label>

      <q-item clickable v-ripple @click="navigateToUnitDetails(myUnit.code)" v-if="myUnit">
        <q-item-section>
          <q-item-label lines="1">{{ myUnit.name }}</q-item-label>
          <q-item-label caption>{{ myUnit.code }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Các lớp khác trong khối</q-item-label>

      <template v-for="unit in unitList" :key="unit.code">
        <q-item
          v-if="unit.my_unit === false"
          clickable
          v-ripple
          @click="navigateToUnitDetails(unit.code)"
        >
          <q-item-section>
            <q-item-label lines="1">{{ unit.name }}</q-item-label>
            <q-item-label caption>{{ unit.code }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from 'stores/app-store'
import { useUnitStore } from 'stores/unit-store'
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const appStore = useAppStore()
const unitStore = useUnitStore()

const myUnit = ref(null)

const { setPageTitle } = appStore
const { unitList } = storeToRefs(unitStore)

onBeforeMount(async () => {
  setPageTitle('Quản lý lớp')
  await unitStore.getUnitList()
  myUnit.value = unitList.value.find((unit) => unit.my_unit === true)
})

const navigateToUnitDetails = (unitCode) => {
  router.push(`/units/${unitCode}`)
}
</script>
