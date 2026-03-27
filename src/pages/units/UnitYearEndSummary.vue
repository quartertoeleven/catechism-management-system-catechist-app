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
        </template>
        <q-card>
          <q-card-section>
            <!-- <div class="full-width text-center">
              <div class="text-subtitle1 text-weight-bold">Nhận xét và đánh giá</div>
            </div> -->
            <div class="full-width">
              <q-form class="q-gutter-y-md">
                <q-input v-model="comment" type="textarea" outlined label="Nhận xét" autogrow />
                <div class="row q-gutter-x-md">
                  <div class="col">
                    <q-select
                      outlined
                      v-model="selectedResult"
                      :options="resultOptions"
                      label="Kết quả"
                    />
                  </div>
                  <div class="col">
                    <q-select outlined v-model="selectedRank" :options="rankOptions" label="Hạng" />
                  </div>
                </div>
                <q-input v-model="comment" type="textarea" outlined label="Ghi chú" autogrow />

                <q-btn class="full-width" color="primary" icon="save" label="Lưu" type="submit" />
              </q-form>
            </div>
          </q-card-section>

          <q-card-section>
            <q-separator />
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-y-md">
              <div class="q-pt-sm">
                <apexchart
                  width="100%"
                  height="200"
                  :options="attendanceChartOptions"
                  :series="student.attendances.chartData || []"
                />
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
              </div>
              <div class="full-width flex q-gutter-x-sm items-center">
                <div class="col-3 text-center"></div>
                <div class="col">
                  <q-list bordered separator>
                    <q-item
                      v-for="examScore in student.exam_scores.details"
                      :key="examScore.exam.id"
                    >
                      <q-item-section>
                        <q-item-label>{{ examScore.exam.name }}</q-item-label>
                        <q-item-label caption>Hệ số: {{ examScore.exam.factor }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label class="text-weight-bold">{{
                          examScore.score ? Number(examScore.score).toFixed(1) : '(chưa làm)'
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'

const resultOptions = [
  {
    label: 'Lên lớp',
    value: 'pass',
  },
  {
    label: 'Ở lại lớp',
    value: 'fail',
  },
]
const rankOptions = [
  {
    label: 'Hạng Nhất',
    value: 'first',
  },
  {
    label: 'Hạng Nhì',
    value: 'second',
  },
  {
    label: 'Hạng Ba',
    value: 'third',
  },
  {
    label: 'Hạng Khuyến Khích',
    value: 'encouragement',
  },
]
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
  },
  dataLabels: {},
}
const appStore = useAppStore()
const unitStore = useUnitStore()
const router = useRouter()

const { unitYearEndStudentStatistic, unitDetails } = storeToRefs(unitStore)
const { fetchUnitYearEndStatistic } = unitStore

const selectedSortingBy = ref('first_name')
const isSortAscending = ref(true)
const selectedResult = ref(null)
const selectedRank = ref(null)

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
  }
}
</script>
