<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">
          {{ isEditMode ? `Chỉnh sửa ngày sinh hoạt` : 'Tạo ngày sinh hoạt mới' }}
        </div>
        <div class="text-caption2">
          {{ gradeScheduleDetailsFormData.date }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          class="q-gutter-y-md"
          id="gradeScheduleForm"
          @submit.prevent="onSave"
          ref="gradeScheduleForm"
          greedy
        >
          <q-select
            dropdown-icon="mdi-menu-down"
            label="Từ lịch sinh hoạt chung ngày"
            outlined
            :options="generalSchedules"
            map-options
            emit-value
            option-lab
            clearable
            v-if="!isEditMode"
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

          <q-separator class="" v-if="!isEditMode" />

          <q-input
            outlined
            v-model="gradeScheduleDetailsFormData.date"
            label="Ngày *"
            readonly
            v-if="
              !isEditMode || (isEditMode && !gradeScheduleDetailsFormData.selectedGeneralSchedule)
            "
            ref="gradeScheduleDetailsFormDataValidations.refs.dateRef"
            :rules="gradeScheduleDetailsFormDataValidations.rules.date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  ref="dateSelectionPopup"
                >
                  <q-date
                    v-model="gradeScheduleDetailsFormData.date"
                    today-btn
                    minimal
                    no-unset
                    mask="dddd - DD/MM/YYYY"
                    :readonly="!!gradeScheduleDetailsFormData.selectedGeneralSchedule"
                    :locale="dateLocales"
                    @update:model-value="dateSelectionPopup.hide()"
                  >
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
            :readonly="!!gradeScheduleDetailsFormData.selectedGeneralSchedule"
            label="Học kì"
            v-if="
              !isEditMode || (isEditMode && !gradeScheduleDetailsFormData.selectedGeneralSchedule)
            "
            ref="gradeScheduleDetailsFormDataValidations.refs.semesterRef"
            :rules="gradeScheduleDetailsFormDataValidations.rules.semester"
          />

          <q-input
            outlined
            v-model="gradeScheduleDetailsFormData.massContent"
            label="Nội dung Thánh Lễ"
            hint="Đánh dấu vào ô chọn để bật điểm danh"
            ref="gradeScheduleDetailsFormDataValidations.refs.massRef"
            :rules="gradeScheduleDetailsFormDataValidations.rules.massContent"
            counter
            reactiveRules
          >
            <template v-slot:append>
              <q-checkbox v-model="gradeScheduleDetailsFormData.isMassAttendanceCheck" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="gradeScheduleDetailsFormData.lessonContent"
            label="Nội dung Giáo Lý"
            hint="Đánh dấu vào ô chọn để bật điểm danh"
            counter
            ref="gradeScheduleDetailsFormDataValidations.refs.lessonRef"
            :rules="gradeScheduleDetailsFormDataValidations.rules.lessonContent"
            reactiveRules
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
          :label="isEditMode ? 'Cập nhật' : 'Tạo mới'"
          icon="mdi-content-save"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'

import { dateLocales, semesterOptions } from 'src/helpers/constants'

import { useStudyYearStore } from 'src/stores/study-year-store'
import { useGradeStore } from 'src/stores/grade-store'

const { gradeCode, scheduleId } = defineProps({
  gradeCode: String,
  scheduleId: Number,
})
const emit = defineEmits(['closeOnSaveSuccess'])

const studyYearStore = useStudyYearStore()
const gradeStore = useGradeStore()

const isEditMode = ref(false)
const dialogOpen = ref(false)
const gradeScheduleForm = ref(null)
const dateSelectionPopup = ref(null)

const { generalSchedules } = storeToRefs(studyYearStore)
const gradeScheduleDetailsFormData = ref({
  id: null,
  selectedGeneralSchedule: null,
  massContent: '',
  lessonContent: '',
  date: null,
  semester: null,
  isMassAttendanceCheck: true,
  isLessonAttendanceCheck: true,
})

const gradeScheduleDetailsFormDataValidations = {
  refs: {
    dateRef: ref(null),
    semesterRef: ref(null),
    massRef: ref(null),
    lessonRef: ref(null),
  },
  rules: {
    date: [(val) => (val && val.length > 0) || 'Vui lòng chọn ngày'],
    semester: [(val) => (val && val.length > 0) || 'Vui lòng chọn học kì'],
    massContent: [
      (val) => (val && val.length > 0) || 'Vui lòng điền thông tin về Thánh Lễ',
      (val) => (val && val.length <= 100) || 'Tối đa 100 kí tự',
    ],
    lessonContent: [
      (val) => (val && val.length > 0) || 'Vui lòng nhập thông tin về sinh hoạt Giáo Lý',
      (val) => (val && val.length <= 100) || 'Tối đa 100 kí tự',
    ],
  },
}

const { fetchStudyYearGeneralSchedules } = studyYearStore
const { createOrUpdateGradeSchedule } = gradeStore

const prefillGradeScheduleFormData = (value) => {
  if (!value) {
    return
  }

  if (isEditMode.value) {
    gradeScheduleDetailsFormData.value.id = value.id
    gradeScheduleDetailsFormData.value.selectedGeneralSchedule = value.general_schedule
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
  const validationResult = await gradeScheduleForm.value.validate()
  if (!validationResult) {
    return
  }
  const requestBody = {
    id: gradeScheduleDetailsFormData.value.id,
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

const resetFormData = () => {
  gradeScheduleDetailsFormData.value = {
    selectedGeneralSchedule: null,
    massContent: '',
    lessonContent: '',
    date: null,
    semester: null,
    isMassAttendanceCheck: true,
    isLessonAttendanceCheck: true,
  }
}

const open = async () => {
  resetFormData()
  dialogOpen.value = true
  await fetchStudyYearGeneralSchedules()
  if (scheduleId) {
    isEditMode.value = true
    const result = await gradeStore.fetchGradeScheduleDetails(gradeCode, scheduleId)
    prefillGradeScheduleFormData(result)
  } else {
    isEditMode.value = false
  }
}

defineExpose({
  open,
})
</script>
