<template>
  <div class="q-pa-md">
    <q-input class="q-pb-md" outlined v-model="quickFilterText" placeholder="Nhập để tìm kiếm nhanh" dense>
      <template v-slot:append v-if="quickFilterText">
        <q-icon name="mdi-close" @click="quickFilterText = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-list bordered separator>
      <q-item v-for="student in unitDetails.students" :key="student.code" class="" clickable v-ripple
        :to="`/students/${student.code}`" v-show="quickFilterText
          ? (student.full_name?.toLowerCase().includes(quickFilterText.toLowerCase()) || student.full_name_without_accent?.toLowerCase().includes(quickFilterText.toLowerCase()))
          : true
          ">
        <q-item-section avatar>
          <q-icon color="" size="lg" :name="student.gender === 'male' ? 'mdi-face-man' : 'mdi-face-woman'" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ student.saint_name }} {{ student.full_name }}</q-item-label>
          <q-item-label caption lines="1">{{ student.code }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'

const unitStore = useUnitStore()
const appStore = useAppStore()
const router = useRouter()

const { unitDetails } = storeToRefs(unitStore)
const { resetUnitDetails } = unitStore
const { setPageSubtitle, setPageTitle } = appStore

const quickFilterText = ref('')

onMounted(async () => {
  resetUnitDetails()
  await unitStore.getSpecificUnitDetails(router.currentRoute.value.params.unit_code)
  setPageTitle('Danh sách lớp')
  setPageSubtitle(unitDetails.value.name)
})

</script>
