<template>
  <div class="q-pa-md q-mb-xl">
    <div class="row q-gutter-md q-pb-md">
      <!-- <div class="col">
        <q-input outlined placeholder="Nhập để tìm kiếm nhanh" v-model="quickFilterText" dense>
          <template v-slot:append>
            <q-icon name="mdi-close" class="cursor-pointer" />
          </template>
        </q-input>
      </div> -->
      <div class="col">
        <q-btn
          color="primary"
          icon="mdi-plus"
          label="Tạo bài kiểm tra mới"
          class="full-height full-width"
          @click="examEntryModalRef.open()"
        />
      </div>
    </div>

    <q-list bordered separator v-if="gradeExams.length">
      <q-item
        v-for="exam in gradeExams"
        :key="exam.id"
        clickable
        v-ripple
        @click="examEntryModalRef.open(exam)"
      >
        <q-item-section>
          <q-item-label caption>Học kì {{ exam.semester === 'first' ? 'I' : 'II' }}</q-item-label>
          <q-item-label>{{ exam.name }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Hệ số</q-item-label>
          <q-item-label overline>{{ exam.factor }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            color="negative"
            icon="mdi-delete-outline"
            @click.prevent.stop="deleteExam(exam)"
          />
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
import { useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { useAppStore } from 'src/stores/app-store'
import { useGradeStore } from 'src/stores/grade-store'

import ExamEntryModal from './modals/ExamEntryModal.vue'

const appStore = useAppStore()
const gradeStore = useGradeStore()
const router = useRouter()
const $q = useQuasar()

const { gradeDetails, gradeExams } = storeToRefs(gradeStore)
const { setPageTitle, setPageSubtitle } = appStore
const { getGradeExamList } = gradeStore
const examEntryModalRef = ref(null)

onMounted(async () => {
  await getGradeExamList(router.currentRoute.value.params.grade_code)
  setPageTitle('Danh sách bài kiểm tra')
  setPageSubtitle(gradeDetails.value.name)
})

const deleteExam = async (exam) => {
  const confirmationDialog = $q.dialog({
    title: 'Xóa bài kiểm tra',
    message: `<p>Bạn có chắc muốn xóa bài kiểm tra <b>${sanitizeHtml(exam.name)}</b> không? </p> Toàn bộ dữ liệu về điểm số của bài kiểm tra này cũng sẽ bị xóa.`,
    html: true,
    ok: {
      label: 'Đồng ý xóa',
      flat: true,
      color: 'negative',
      icon: 'mdi-delete-outline',
    },
    cancel: {
      label: 'Hủy',
      flat: true,
      color: 'grey-14',
      icon: 'mdi-close',
    },
    focus: 'cancel',
  })

  confirmationDialog.onOk(async () => {
    await gradeStore.deleteGradeExam(exam.id)
    await getGradeExamList(router.currentRoute.value.params.grade_code)
  })
}
</script>
