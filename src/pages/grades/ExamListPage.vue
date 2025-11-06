<template>
  <div class="q-pa-md q-mb-xl">
    <div class="row q-gutter-md q-pb-md">
      <div class="col">
        <q-input outlined placeholder="Nhập để tìm kiếm nhanh" dense>
          <template v-slot:append>
            <q-icon name="mdi-close" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          icon="mdi-plus"
          label="Thêm mới"
          class="full-height"
          @click="examEntryModalRef.open()"
        />
      </div>
    </div>

    <q-list bordered separator>
      <q-item v-for="exam in gradeExams" :key="exam.id" clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Học kì {{ exam.semester === 'first' ? 'I' : 'II' }}</q-item-label>
          <q-item-label>{{ exam.name }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Hệ số</q-item-label>
          <q-item-label overline>{{ exam.factor }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <ExamEntryModal
    ref="examEntryModalRef"
    :gradeCode="router.currentRoute.value.params.grade_code"
    @closeOnSaveSuccess="() => getGradeExamList(router.currentRoute.value.params.grade_code)"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app-store'
import { useGradeStore } from 'src/stores/grade-store'

import ExamEntryModal from './modals/ExamEntryModal.vue'

const appStore = useAppStore()
const gradeStore = useGradeStore()
const router = useRouter()

const { gradeDetails, gradeExams } = storeToRefs(gradeStore)
const { setPageTitle, setPageSubtitle } = appStore
const { getGradeExamList } = gradeStore
const examEntryModalRef = ref(null)

onMounted(async () => {
  await getGradeExamList(router.currentRoute.value.params.grade_code)
  setPageTitle('Danh sách bài kiểm tra')
  setPageSubtitle(gradeDetails.value.name)
})
</script>
