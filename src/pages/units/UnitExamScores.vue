<template>
  <div class="q-pa-md">
    <q-expansion-item
      icon="mdi-book-multiple"
      :label="chosenExam?.name || '(chưa chọn)'"
      :caption="
        chosenExam
          ? `Hệ số: ${chosenExam?.factor} - Học kì ${chosenExam?.semester === 'first' ? 'I' : 'II'}`
          : '(chưa chọn)'
      "
      expand-separator
      v-model="chooseExamExpanded"
    >
      <div class="q-pt-md">
        <q-select
          outlined
          label="Chọn bài kiểm tra"
          :options="gradeExams"
          option-label="name"
          option-value="code"
          onChoseExam
          emit-value
          map-options
          autofocus
          v-model="chosenExam"
          @update:model-value="onChoseExam"
        />
      </div>
    </q-expansion-item>

    <q-separator spaced="0.8rem" />

    <q-list bordered separator v-if="unitExamScores.length > 0">
      <q-item v-for="examScore in unitExamScores" :key="examScore.student.code">
        <q-item-section>
          <q-item-label caption>{{ examScore.student.code }}</q-item-label>
          <q-item-label
            >{{ examScore.student.saint_name }}
            {{ getStudentFullName(examScore.student) }}</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-select
            dense
            style="width: 8rem"
            outlined
            :options="scoreOptions"
            v-model="examScore.score"
            @update:model-value="onScoreChange(examScore)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'
import { useGradeStore } from 'src/stores/grade-store'
import { scoreOptions } from 'src/helpers/constants'

const appStore = useAppStore()
const unitStore = useUnitStore()
const gradeStore = useGradeStore()
const router = useRouter()

const { setPageTitle, setPageSubtitle } = appStore
const { fetchUnitExamScoreList, updateStudentExamScore } = unitStore
const { unitDetails } = storeToRefs(unitStore)
const { gradeExams } = storeToRefs(gradeStore)
const chooseExamExpanded = ref(true)
const chosenExam = ref(null)
const unitExamScores = ref([])

onMounted(async () => {
  await unitStore.getSpecificUnitDetails(router.currentRoute.value.params.unit_code)
  await gradeStore.getGradeExamList(unitDetails.value.grade_code)
  setPageTitle('Điểm kiểm tra')
  setPageSubtitle(unitDetails.value.name)
})

const onChoseExam = async () => {
  chooseExamExpanded.value = false
  const result = await fetchUnitExamScoreList(unitDetails.value.code, chosenExam.value.id)
  unitExamScores.value = result
}

const getStudentFullName = (student) => {
  const nameSegments = [student.last_name, student.middle_name, student.first_name]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}

const onScoreChange = (examScoreEntry) => {
  updateStudentExamScore(examScoreEntry.student.code, examScoreEntry.exam.id, examScoreEntry.score)
}
</script>
