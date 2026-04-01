<template>
  <div class="q-pa-md q-gutter-md">
    <q-select
      dropdown-icon="mdi-menu-down"
      outlined
      :options="sortingByOptions"
      map-options
      emit-value
      v-model="selectedSortingBy"
      label="Sắp xếp theo"
      dense
      @update:model-value="handleSorting"
    >
      <template v-slot:after>
        <q-btn
          color="primary"
          :icon="isSortAscending ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
          class="full-height"
          @click="onChangeSortingOrder"
        />
      </template>
    </q-select>
    <q-list bordered separator>
      <q-expansion-item v-for="student in unitYearEndStudentStatistic" :key="student.code">
        <template #header>
          <q-item-section avatar>
            <q-icon color="" size="lg" name="mdi-face-man" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ student.saint_name }} {{ student.full_name }}</q-item-label>
            <q-item-label caption lines="1">{{ student.code }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="selectedSortingBy === 'attendance_both'">
            <q-item-label caption>Hiện diện</q-item-label>
            <q-item-label class="text-weight-bold">{{
              student.attendances.mass_total_present + student.attendances.lesson_total_present
            }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="selectedSortingBy === 'attendance_mass'">
            <q-item-label caption>Hiện diện</q-item-label>
            <q-item-label class="text-weight-bold">{{
              student.attendances.mass_total_present
            }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="selectedSortingBy === 'attendance_lesson'">
            <q-item-label caption>Hiện diện</q-item-label>
            <q-item-label class="text-weight-bold">{{
              student.attendances.lesson_total_present
            }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="selectedSortingBy === 'avg_score'">
            <q-item-label caption>Điểm trung bình</q-item-label>
            <q-item-label class="text-weight-bold">{{
              student.exam_scores.final_average
                ? Number(student.exam_scores.final_average).toFixed(1)
                : '0.0'
            }}</q-item-label>
          </q-item-section>
          <q-item-section side v-if="selectedSortingBy === 'unit_ranking'">
            <q-item-label caption>Hạng</q-item-label>
            <q-item-label class="text-weight-bold">{{
              unitRankOptions.find(
                (option) => option.value === student.year_end_result.unit_ranking,
              )?.label
            }}</q-item-label>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="full-width">
              <q-form class="q-gutter-y-md" @submit.prevent="handleYearEndResultSubmit(student)">
                <q-input
                  v-model="student.year_end_result.remark"
                  type="textarea"
                  outlined
                  label="Nhận xét"
                  autogrow
                  maxlength="500"
                />
                <div class="row q-gutter-x-md">
                  <div class="col">
                    <q-select
                      outlined
                      v-model="student.year_end_result.result"
                      :options="studyYearResultOptions"
                      map-options
                      emit-value
                      clearable
                      clear-icon="mdi-close"
                      label="Kết quả"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      v-model="student.year_end_result.unit_ranking"
                      :options="unitRankOptions"
                      map-options
                      emit-value
                      clearable
                      clear-icon="mdi-close"
                      label="Hạng"
                    />
                  </div>
                </div>
                <q-input
                  v-model="student.year_end_result.notes"
                  type="textarea"
                  outlined
                  label="Ghi chú"
                  autogrow
                  maxlength="500"
                />

                <q-btn
                  class="full-width"
                  color="primary"
                  icon="save"
                  label="Lưu"
                  type="submit"
                  :loading="student.isSaving"
                />
              </q-form>
            </div>
          </q-card-section>

          <q-card-section>
            <q-separator />
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-y-md">
              <div class="q-pt-none">
                <apexchart
                  width="100%"
                  height="200"
                  :options="attendanceChartOptions"
                  :series="student.attendances.chartData || []"
                />
                <div class="q-mt-sm text-center">
                  <q-btn
                    flat
                    dense
                    color="primary"
                    icon="mdi-eye"
                    label="Xem chi tiết điểm danh"
                    @click="openAttendanceDetailModal(student)"
                    size="sm"
                  />
                </div>
              </div>
              <div class="full-width text-center">
                <div class="text-subtitle1 text-weight-bold">Điểm trung bình</div>
                <q-circular-progress
                  :value="(100 / 10) * student.exam_scores.final_average"
                  :color="
                    student.exam_scores.final_average >= 8
                      ? 'positive'
                      : student.exam_scores.final_average >= 5
                        ? 'warning'
                        : 'negative'
                  "
                  size="10em"
                  class="q-ma-md"
                  show-value
                  track-color="grey-3"
                >
                  {{
                    student.exam_scores.final_average
                      ? Number(student.exam_scores.final_average).toFixed(1)
                      : '0.0'
                  }}
                </q-circular-progress>
                <div class="q-mt-sm">
                  <q-btn
                    flat
                    dense
                    color="primary"
                    icon="mdi-eye"
                    label="Xem chi tiết điểm thi"
                    @click="openExamDetailModal(student)"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <StudentAttendanceDetailModal ref="studentAttendanceDetailModalRef" />
    <StudentExamResultDetailModal ref="studentExamResultDetailModalRef" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'
import { useStudentStore } from 'src/stores/student-store'
import { studyYearResultOptions, unitRankOptions } from 'src/helpers/constants'

import StudentAttendanceDetailModal from './modals/StudentAttendanceDetailModal.vue'
import StudentExamResultDetailModal from './modals/StudentExamResultDetailModal.vue'

const sortingByOptions = [
  {
    label: 'Tên học viên',
    value: 'first_name',
  },
  {
    label: 'Mã học viên',
    value: 'code',
  },
  {
    label: 'Hiện diện (thánh lễ & giáo lý)',
    value: 'attendance_both',
  },
  {
    label: 'Hiện diện thánh lễ',
    value: 'attendance_mass',
  },
  {
    label: 'Hiện diện giáo lý',
    value: 'attendance_lesson',
  },
  {
    label: 'Điểm trung bình',
    value: 'avg_score',
  },
  {
    label: 'Hạng',
    value: 'unit_ranking',
  },
]
const attendanceChartOptions = {
  title: {
    text: 'Tổng kết chuyên cần',
    align: 'center',
    floating: false,
  },
  colors: ['#21ba45', '#f2c037', '#c10015'],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    categories: ['Thánh lễ', 'Giáo lý'],
    labels: {
      show: false,
    },
  },
  chart: {
    type: 'bar',
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
  },
  dataLabels: {},
}
const appStore = useAppStore()
const unitStore = useUnitStore()
const studentStore = useStudentStore()
const router = useRouter()

const { unitYearEndStudentStatistic, unitDetails } = storeToRefs(unitStore)
const { fetchUnitYearEndStatistic } = unitStore

const selectedSortingBy = ref('first_name')
const isSortAscending = ref(true)
const studentAttendanceDetailModalRef = ref(null)
const studentExamResultDetailModalRef = ref(null)

onMounted(async () => {
  appStore.setPageTitle('Tổng kết năm học')
  await fetchUnitYearEndStatistic(router.currentRoute.value.params.unit_code)
  appStore.setPageSubtitle(unitDetails.value.name)
  populateChartData()
})

const populateChartData = () => {
  unitYearEndStudentStatistic.value.forEach((student_stat) => {
    student_stat.attendances.chartData = [
      {
        name: 'Hiện diện',
        data: [
          student_stat.attendances.mass_total_present,
          student_stat.attendances.lesson_total_present,
        ],
      },
      {
        name: 'Vắng có phép',
        data: [
          student_stat.attendances.mass_total_leave,
          student_stat.attendances.lesson_total_leave,
        ],
      },
      {
        name: 'Vắng không phép',
        data: [
          student_stat.attendances.mass_total_absent,
          student_stat.attendances.lesson_total_absent,
        ],
      },
    ]
  })
}

const onChangeSortingOrder = () => {
  isSortAscending.value = !isSortAscending.value
  handleSorting()
}

const handleSorting = () => {
  console.log('Sorting by changed to:', selectedSortingBy.value)
  switch (selectedSortingBy.value) {
    case 'first_name':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort((a, b) =>
          a.first_name.localeCompare(b.first_name, 'vi'),
        )
      } else {
        unitYearEndStudentStatistic.value.sort((a, b) =>
          b.first_name.localeCompare(a.first_name, 'vi'),
        )
      }
      break
    case 'code':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort((a, b) => a.code.localeCompare(b.code))
      } else {
        unitYearEndStudentStatistic.value.sort((a, b) => b.code.localeCompare(a.code))
      }
      break
    case 'attendance_both':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort(
          (a, b) =>
            a.attendances.mass_total_present +
            a.attendances.lesson_total_present -
            (b.attendances.mass_total_present + b.attendances.lesson_total_present),
        )
      } else {
        unitYearEndStudentStatistic.value.sort(
          (a, b) =>
            b.attendances.mass_total_present +
            b.attendances.lesson_total_present -
            (a.attendances.mass_total_present + a.attendances.lesson_total_present),
        )
      }
      break
    case 'attendance_mass':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => a.attendances.mass_total_present - b.attendances.mass_total_present,
        )
      } else {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => b.attendances.mass_total_present - a.attendances.mass_total_present,
        )
      }
      break
    case 'attendance_lesson':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => a.attendances.lesson_total_present - b.attendances.lesson_total_present,
        )
      } else {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => b.attendances.lesson_total_present - a.attendances.lesson_total_present,
        )
      }
      break
    case 'avg_score':
      if (isSortAscending.value) {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => a.exam_scores.final_average - b.exam_scores.final_average,
        )
      } else {
        unitYearEndStudentStatistic.value.sort(
          (a, b) => b.exam_scores.final_average - a.exam_scores.final_average,
        )
      }
      break
    case 'unit_ranking':
      isSortAscending.value = true
      unitYearEndStudentStatistic.value.sort((a, b) => {
        const rankOrder = ['first', 'second', 'third', 'encouragement', null]
        return (
          rankOrder.indexOf(a.year_end_result.unit_ranking) -
          rankOrder.indexOf(b.year_end_result.unit_ranking)
        )
      })
      break
  }
}

const handleYearEndResultSubmit = async (student) => {
  student.isSaving = true
  const yearEndResultRequestData = {
    // student_code: student.year_end_result.student_code,
    study_year_code: student.year_end_result.study_year_code,
    result: student.year_end_result.result,
    remark: student.year_end_result.remark,
    unit_ranking: student.year_end_result.unit_ranking,
    notes: student.year_end_result.notes,
  }
  try {
    await studentStore.saveStudentYearEndResult(
      student.year_end_result.student_code,
      yearEndResultRequestData,
    )
  } finally {
    student.isSaving = false
  }
}

const openExamDetailModal = (student) => {
  studentExamResultDetailModalRef.value.open(student)
}

const openAttendanceDetailModal = (student) => {
  studentAttendanceDetailModalRef.value.open(student)
}
</script>
