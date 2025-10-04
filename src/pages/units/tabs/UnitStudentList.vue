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

        <!-- <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section> -->
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useUnitStore } from 'src/stores/unit-store'
import { storeToRefs } from 'pinia'

const unitStore = useUnitStore()

const { unitDetails } = storeToRefs(unitStore)

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
