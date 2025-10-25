<template>
  <div>
    <q-list>
      <q-item
        v-for="student in unitDetails.students"
        :key="student.code"
        class=""
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ getStudentFullName(student) }}</q-item-label>
          <q-item-label caption lines="1">{{ student.code }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'

const unitStore = useUnitStore()
const appStore = useAppStore()
const router = useRouter()

const { unitDetails } = storeToRefs(unitStore)
const { resetUnitDetails } = unitStore
const { setPageSubtitle, setPageTitle } = appStore

onMounted(async () => {
  resetUnitDetails()
  await unitStore.getSpecificUnitDetails(router.currentRoute.value.params.unit_code)
  setPageTitle('Danh sách lớp')
  setPageSubtitle(unitDetails.value.name)
})

const getStudentFullName = (student) => {
  const nameSegments = [
    student.saint_name,
    student.last_name,
    student.middle_name,
    student.first_name,
  ]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}
</script>
