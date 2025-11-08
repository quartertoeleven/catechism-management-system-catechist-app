<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">
          {{ isEditMode ? 'Chỉnh sửa bài kiểm tra' : 'Tạo bài kiểm tra mới' }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-y-xs" @submit.prevent="onSave" id="examEntryForm">
          <q-input
            ref="examEntryFormDataValidations.refs.nameRef"
            class="full-width"
            outlined
            label="Tên bài kiểm tra *"
            v-model="examEntryFormData.name"
            lazy-rules
            :rules="examEntryFormDataValidations.rules.name"
            autofocus
          />
          <div class="row q-gutter-x-md">
            <div class="col">
              <q-input
                ref="examEntryFormDataValidations.refs.factorRef"
                class="full-width"
                outlined
                label="Hệ số *"
                type="number"
                v-model="examEntryFormData.factor"
                lazy-rules
                :rules="examEntryFormDataValidations.rules.factor"
              />
            </div>
            <div class="col">
              <q-select
                ref="examEntryFormDataValidations.refs.semesterRef"
                dropdown-icon="mdi-menu-down"
                outlined
                :options="semesterOptions"
                map-options
                emit-value
                v-model="examEntryFormData.semester"
                label="Học kì *"
                :rules="examEntryFormDataValidations.rules.semester"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Hủy" icon="mdi-close-circle" color="negative" v-close-popup />
        <q-btn
          flat
          type="submit"
          form="examEntryForm"
          :label="isEditMode ? 'Cập nhật' : 'Tạo mới'"
          icon="mdi-content-save"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGradeStore } from 'src/stores/grade-store'
import { semesterOptions } from 'src/helpers/constants'

const { gradeCode } = defineProps({
  gradeCode: String,
  examEntry: { type: Object, default: null },
})
const emit = defineEmits(['closeOnSaveSuccess'])

const gradeStore = useGradeStore()

const { createOrUpdateGradeExam } = gradeStore
const isEditMode = ref(false)
const dialogOpen = ref(false)
const examEntryFormData = ref({
  id: null,
  name: '',
  factor: 1,
  semester: '',
})
const examEntryFormDataValidations = {
  refs: {
    nameRef: ref(null),
    factorRef: ref(null),
    semesterRef: ref(null),
  },
  rules: {
    name: [
      (val) => (val && val.length > 0) || 'Vui lòng nhập tên bài kiểm tra',
      (val) => (val && val.length <= 100) || 'Tối đa 100 kí tự',
    ],
    factor: [
      (val) => (val && Number(val) > 0 && Number.isInteger(Number(val))) || 'Phải là số nguyên > 0',
    ],
    semester: [
      (val) => {
        console.log(val)
        return !!val || 'Vui lòng chọn học kì'
      },
    ],
  },
}

const resetFormData = () => {
  examEntryFormData.value = {
    id: null,
    name: '',
    factor: 1,
    semester: '',
  }
}

onMounted(() => {
  resetFormData()
})

const open = (existingExamEntry = null) => {
  dialogOpen.value = true
  if (existingExamEntry) {
    isEditMode.value = true
    examEntryFormData.value = {
      id: existingExamEntry.id,
      name: existingExamEntry.name,
      factor: existingExamEntry.factor,
      semester: existingExamEntry.semester,
    }
  } else {
    isEditMode.value = false
    resetFormData()
  }
}

const onSave = async () => {
  const body = {
    id: examEntryFormData.value.id,
    name: examEntryFormData.value.name,
    factor: Number(examEntryFormData.value.factor),
    semester: examEntryFormData.value.semester,
  }
  await createOrUpdateGradeExam(gradeCode, body)
  dialogOpen.value = false
  emit('closeOnSaveSuccess')
}

defineExpose({
  open,
})
</script>
