<template>
  <div>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-select outlined dense v-model="selectedDateOption" :options="dateOptions" label="Ngày điểm danh"
          @update:model-value="onDateOptionChange" />
        <q-select outlined dense v-model="selectedTypeOption" :options="attendanceTypeOptions" label="Loại điểm danh"
          :disable="!selectedDateOption" />
      </div>
    </div>

    <q-separator inset />

    <div class="q-mx-md q-mb-md">
      <div class="text-center bg-primary">
        <div class="q-mt-md q-pt-md text-weight-bold text-white">ĐIỂM DANH THEO DANH SÁCH LỚP</div>
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="white" padding arrows height="20rem" class="bg-primary text-white">
          <q-carousel-slide v-for="n in 30" :key="n" :name="`slide-${n}`" class="column no-wrap flex-center">
            <div class="q-mt-md text-center">
              <div>Maria Gorreti</div>
              <div class="text-h5 text-weight-bold">Nguyễn Đào Thanh Kim Nhật</div>
              <div class="text-subtitle2">GL2025-HS0001</div>
            </div>
            <div class="q-mt-md q-gutter-md full-width">
              <q-btn-toggle v-model="attendanceStatus" spread no-caps :options="attendanceOptions"
                :toggle-color="attendanceStatus === 'present' ? 'positive' : 'negative'" color="white"
                text-color="primary" />
            </div>
            <div class="q-mt-md flex" v-if="attendanceStatus === 'absence'">
              <q-checkbox v-model="isNotifiedAbsence" label="Vắng có phép" color="negative" dark />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <q-separator inset />

    <div class="q-mt-md q-mx-md">
      <q-btn class="full-width" color="primary" icon="qr_code" label="Điểm danh sử dụng QR" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUnitStore } from 'stores/unit-store'
import { useRouter } from 'vue-router'
import { date } from 'quasar'

const router = useRouter()
const unitStore = useUnitStore()

const dateOptions = ref([])
const attendanceTypeOptions = ref([])
const selectedDateOption = ref(null)
const selectedTypeOption = ref(null)

const { unitSchedules } = storeToRefs(unitStore)

const populateUnitScheduleOptions = () => {
  const populatedDateOptions = unitSchedules.value.map((schedule) => {
    const option = {
      label: date.formatDate(schedule.date, 'DD/MM/YYYY'),
      value: schedule.date,
      raw_data: {
        is_lesson_check: schedule.is_lesson_attendance_check,
        is_mass_check: schedule.is_mass_attendance_check,
        lesson_content: schedule.lesson_content,
        mass_content: schedule.mass_content,
      }
    }
    return option
  })
  dateOptions.value = populatedDateOptions
}

const onDateOptionChange = () => {
  populateAttendanceTypeOptions()
}

const populateAttendanceTypeOptions = () => {
  let massOption, lessonOption = null
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

onMounted(async () => {
  await unitStore.fetchUnitSchedules(router.currentRoute.value.params.unit_code)
  populateUnitScheduleOptions()
})

// const attendanceDateOptions = [
//   {
//     label: '21/09/2025',
//     value: '2025-09-21',
//   },
//   {
//     label: '28/09/2025',
//     value: '2025-09-28',
//   },
//   {
//     label: '05/10/2025',
//     value: '2025-10-05',
//   },
// ]

// const attendanceTypeOptions = [
//   {
//     label: 'Thánh lễ',
//     value: 'mass',
//   },
//   {
//     label: 'Giáo lý',
//     value: 'lesson',
//   },
// ]

const attendanceOptions = [
  {
    label: 'Hiện diện',
    value: 'present',
  },
  {
    label: 'Vắng',
    value: 'absence',
  },
]

const slide = ref('slide-1')
const attendanceStatus = ref('absence')
const isNotifiedAbsence = ref(false)
</script>
