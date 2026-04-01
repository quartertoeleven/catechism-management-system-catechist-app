<template>
  <q-dialog v-model="dialogOpen">
    <q-card class="full-width" style="max-height: 90vh">
      <q-card-section class="row items-center q-pb-none">
        <div class="col">
          <div class="text-h6 text-weight-regular">Chi tiết điểm thi</div>
          <div class="text-caption text-grey-7" v-if="studentData">
            {{ studentData.saint_name }} {{ studentData.full_name }} <br />
            {{ studentData.code }}
          </div>
        </div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup class="text-grey-6" />
      </q-card-section>
      <q-card-section v-if="studentData" class="text-center q-pa-sm">
        <div class="row justify-center">
          <div class="col-12">
            <div class="text-subtitle1 text-weight-bold">Điểm trung bình</div>
            <q-circular-progress
              :value="(100 / 10) * (studentData.exam_scores?.final_average || 0)"
              :color="
                (studentData.exam_scores?.final_average || 0) >= 8
                  ? 'positive'
                  : (studentData.exam_scores?.final_average || 0) >= 5
                    ? 'warning'
                    : 'negative'
              "
              size="10em"
              class="q-ma-md"
              show-value
              track-color="grey-3"
            >
              {{
                studentData.exam_scores?.final_average
                  ? Number(studentData.exam_scores.final_average).toFixed(1)
                  : '0.0'
              }}
            </q-circular-progress>
          </div>
        </div>
      </q-card-section>
      <q-card-section style="max-height: 60vh; overflow-y: auto">
        <div class="">
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-left">Tên bài thi</th>
                <th class="text-center">Hệ số</th>
                <th class="text-center">Điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="examScore in examScores"
                :key="`${studentData?.code}-${examScore.exam.id}`"
              >
                <td class="text-left">
                  {{ examScore.exam.name }}
                </td>
                <td class="text-center">
                  {{ examScore.exam.factor }}
                </td>
                <td class="text-center">
                  <div class="text-body2 text-weight-bold">
                    {{ examScore.score ? Number(examScore.score).toFixed(1) : '(chưa làm)' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const dialogOpen = ref(false)
const studentData = ref(null)

const examScores = computed(() => {
  return studentData.value?.exam_scores?.details || []
})

const open = (student) => {
  studentData.value = student
  dialogOpen.value = true
}

defineExpose({
  open,
})
</script>
