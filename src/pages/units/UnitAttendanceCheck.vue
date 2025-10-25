<template>
  <div>
    <div class="q-pa-md">
      <q-expansion-item
        v-model="expanded"
        icon="mdi-calendar-blank"
        :label="selectedTypeOption?.label || '(chưa chọn)'"
        :caption="selectedDateOption?.label || '(chưa chọn)'"
        expand-icon="mdi-chevron-down"
      >
        <div class="q-pt-md">
          <div class="q-gutter-md">
            <q-select
              outlined
              dense
              v-model="selectedDateOption"
              :options="dateOptions"
              label="Ngày điểm danh"
              @update:model-value="onDateOptionChange"
              dropdown-icon="mdi-menu-down"
            />
            <q-select
              outlined
              dense
              v-model="selectedTypeOption"
              :options="attendanceTypeOptions"
              label="Loại điểm danh"
              :disable="!selectedDateOption"
              @update:model-value="onTypeOptionChange"
              dropdown-icon="mdi-menu-down"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <q-separator inset />

    <div
      class="q-pa-md q-mb-xl"
      v-if="unitAttendancesForSchedule && unitAttendancesForSchedule.length > 0"
    >
      <q-list bordered separator>
        <q-item
          v-for="attendanceEntry in unitAttendancesForSchedule"
          :key="attendanceEntry.student.code"
        >
          <q-item-section>
            <div class="row no-wrap justify-start">
              <div class="col">
                <q-item-label caption>{{ attendanceEntry.student.saint_name }}</q-item-label>
                <q-item-label> {{ getStudentFullName(attendanceEntry.student) }}</q-item-label>
              </div>
              <q-item-label caption>{{ attendanceEntry.student.code }}</q-item-label>
            </div>

            <div class="row q-pt-sm">
              <div class="col text-center">
                <q-radio
                  v-for="attendanceOption in attendanceOptions"
                  :key="attendanceOption.value"
                  :val="attendanceOption.value"
                  v-model="attendanceEntry.status"
                  keep-color
                  :label="attendanceOption.label"
                  :color="attendanceOption.color"
                  @update:model-value="updateAttendance(attendanceEntry)"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn fab icon="mdi-arrow-up" color="primary" @click="scrollToTop" />
    </q-page-sticky>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUnitStore } from 'stores/unit-store'
import { useAppStore } from 'src/stores/app-store'
import { useRouter } from 'vue-router'
import { date } from 'quasar'

const attendanceOptions = [
  {
    label: 'Hiện diện',
    value: 'present',
    color: 'positive',
  },
  {
    label: 'Vắng có phép',
    value: 'leave',
    color: 'warning',
  },
  {
    label: 'Vắng',
    value: 'absent',
    color: 'negative',
  },
]

const slide = ref(null)
const expanded = ref(true)

const router = useRouter()
const unitStore = useUnitStore()
const appStore = useAppStore()

const dateOptions = ref([])
const attendanceTypeOptions = ref([])
const selectedDateOption = ref(null)
const selectedTypeOption = ref(null)
const unitAttendancesForSchedule = ref([])

const { unitSchedules, unitDetails } = storeToRefs(unitStore)
const { setPageSubtitle, setPageTitle } = appStore

onMounted(async () => {
  setPageTitle('Điểm danh')
  await unitStore.fetchUnitSchedules(router.currentRoute.value.params.unit_code)
  setPageSubtitle(unitDetails.value.name)
  populateUnitScheduleOptions()
})

const populateUnitScheduleOptions = () => {
  const populatedDateOptions = unitSchedules.value.map((schedule) => {
    const option = {
      label: date.formatDate(schedule.date, 'DD/MM/YYYY'),
      value: schedule.id,
      raw_data: {
        is_lesson_check: schedule.is_lesson_attendance_check,
        is_mass_check: schedule.is_mass_attendance_check,
        lesson_content: schedule.lesson_content,
        mass_content: schedule.mass_content,
      },
    }
    return option
  })
  dateOptions.value = populatedDateOptions
}

const onDateOptionChange = () => {
  selectedTypeOption.value = null
  unitAttendancesForSchedule.value = null
  populateAttendanceTypeOptions()
}

const onTypeOptionChange = () => {
  if (selectedTypeOption.value) {
    populateAttendanceEntry()
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const populateAttendanceTypeOptions = () => {
  let massOption,
    lessonOption = null
  const availableOptions = []

  if (selectedDateOption.value.raw_data.is_mass_check) {
    massOption = {
      label: `Thánh lễ - ${selectedDateOption.value.raw_data.mass_content}`,
      value: 'mass',
    }
    availableOptions.push(massOption)
  }
  if (selectedDateOption.value.raw_data.is_lesson_check) {
    lessonOption = {
      label: `Giáo lý - ${selectedDateOption.value.raw_data.lesson_content}`,
      value: 'lesson',
    }
    availableOptions.push(lessonOption)
  }

  attendanceTypeOptions.value = availableOptions
}

const populateAttendanceEntry = async () => {
  const result = await unitStore.fetchUnitAttendancesForSchedule(
    router.currentRoute.value.params.unit_code,
    selectedDateOption.value.value,
    selectedTypeOption.value.value,
  )
  unitAttendancesForSchedule.value = result
  slide.value = `student-${result[0].student.code}`
  expanded.value = false
}

const getStudentFullName = (student) => {
  const nameSegments = [student.last_name, student.middle_name, student.first_name]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}

const updateAttendance = async (attendanceEntry) => {
  await unitStore.updateAttendanceStatus(
    attendanceEntry.grade_schedule_id,
    selectedTypeOption.value.value,
    attendanceEntry.student.code,
    attendanceEntry.status,
    attendanceEntry.is_notified_absence,
  )
}
</script>
