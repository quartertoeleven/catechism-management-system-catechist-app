<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Thêm ngày sinh hoạt mới</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-y-md" id="gradeScheduleForm" @submit.prevent="onSave">
          <q-select
            dropdown-icon="mdi-menu-down"
            label="Dựa trên lịch sinh hoạt chung ngày"
            outlined
            :options="generalSchedules"
            map-options
            emit-value
            option-lab
            clearable
            v-model="gradeScheduleDetailsFormData.selectedGeneralSchedule"
            @update:model-value="prefillGradeScheduleFormData"
          >
            <template v-slot:selected>
              {{
                gradeScheduleDetailsFormData.selectedGeneralSchedule
                  ? `${date.formatDate(gradeScheduleDetailsFormData.selectedGeneralSchedule.date, 'dddd', dateLocales)} - ${date.formatDate(gradeScheduleDetailsFormData.selectedGeneralSchedule.date, 'DD/MM/YYYY')}`
                  : ''
              }}
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{
                    `${date.formatDate(scope.opt.date, 'dddd', dateLocales)} - ${date.formatDate(scope.opt.date, 'DD/MM/YYYY')}`
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-separator class="" />

          <q-input outlined v-model="gradeScheduleDetailsFormData.date" label="Ngày" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="gradeScheduleDetailsFormData.date"
                    today-btn
                    minimal
                    no-unset
                    mask="dddd - DD/MM/YYYY"
                    :locale="dateLocales"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            dropdown-icon="mdi-menu-down"
            outlined
            :options="semesterOptions"
            map-options
            emit-value
            v-model="gradeScheduleDetailsFormData.semester"
            label="Học kì"
          />

          <q-input
            outlined
            v-model="gradeScheduleDetailsFormData.massContent"
            label="Thánh Lễ"
            hint="Đánh dấu vào ô chọn để bật điểm danh"
          >
            <template v-slot:append>
              <q-checkbox v-model="gradeScheduleDetailsFormData.isMassAttendanceCheck" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="gradeScheduleDetailsFormData.lessonContent"
            label="Giáo Lý"
            hint="Đánh dấu vào ô chọn để bật điểm danh"
          >
            <template v-slot:append>
              <q-checkbox v-model="gradeScheduleDetailsFormData.isLessonAttendanceCheck" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Hủy" icon="mdi-close-circle" color="negative" v-close-popup />
        <q-btn
          flat
          type="submit"
          form="gradeScheduleForm"
          :label="'Tạo mới'"
          icon="mdi-content-save"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'

import { dateLocales, semesterOptions } from 'src/helpers/constants'

import { useStudyYearStore } from 'src/stores/study-year-store'
import { useGradeStore } from 'src/stores/grade-store'

const { gradeCode } = defineProps({
  gradeCode: String,
})
const emit = defineEmits(['closeOnSaveSuccess'])

const studyYearStore = useStudyYearStore()
const gradeStore = useGradeStore()

const { generalSchedules } = storeToRefs(studyYearStore)

const dialogOpen = ref(false)
const gradeScheduleDetailsFormData = ref({
  selectedGeneralSchedule: null,
  massContent: '',
  lessonContent: '',
  date: null,
  semester: null,
  isMassAttendanceCheck: true,
  isLessonAttendanceCheck: true,
})

const { fetchStudyYearGeneralSchedules } = studyYearStore
const { createOrUpdateGradeSchedule } = gradeStore

onMounted(async () => {})

const prefillGradeScheduleFormData = (value) => {
  if (!value) {
    return
  }
  gradeScheduleDetailsFormData.value.date = date.formatDate(
    value.date,
    'dddd - DD/MM/YYYY',
    dateLocales,
  )
  gradeScheduleDetailsFormData.value.semester = value.semester
  gradeScheduleDetailsFormData.value.massContent = value.mass_content
  gradeScheduleDetailsFormData.value.lessonContent = value.lesson_content
  gradeScheduleDetailsFormData.value.isMassAttendanceCheck = value.is_mass_attendance_check
  gradeScheduleDetailsFormData.value.isLessonAttendanceCheck = value.is_lesson_attendance_check
}

const onSave = async () => {
  const requestBody = {
    date: date.formatDate(
      date.extractDate(gradeScheduleDetailsFormData.value.date, 'dddd - DD/MM/YYYY', dateLocales),
      'YYYY-MM-DD',
    ),
    semester: gradeScheduleDetailsFormData.value.semester,
    is_mass_attendance_check: gradeScheduleDetailsFormData.value.isMassAttendanceCheck,
    is_lesson_attendance_check: gradeScheduleDetailsFormData.value.isLessonAttendanceCheck,
    mass_content: gradeScheduleDetailsFormData.value.massContent,
    lesson_content: gradeScheduleDetailsFormData.value.lessonContent,
    general_schedule_id: gradeScheduleDetailsFormData.value.selectedGeneralSchedule?.id || null,
  }
  await createOrUpdateGradeSchedule(gradeCode, requestBody)
  dialogOpen.value = false
  emit('closeOnSaveSuccess')
}

const open = async () => {
  dialogOpen.value = true
  await fetchStudyYearGeneralSchedules()
}

defineExpose({
  open,
})
</script>
