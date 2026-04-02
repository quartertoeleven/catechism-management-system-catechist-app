<template>
  <q-dialog v-model="dialogOpen">
    <q-card id="screenshotModalCard" class="full-width" style="max-height: 90vh">
      <q-card-section class="row items-center q-pb-none">
        <div class="col">
          <div class="text-h6 text-weight-regular">Chi tiết điểm thi</div>
          <div class="text-caption text-grey-7" v-if="studentData">
            {{ studentData.saint_name }} {{ studentData.full_name }} <br />
            {{ studentData.code }}
          </div>
        </div>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="mdi-camera"
          @click="takeModalScreenshot"
          class="text-grey-6"
          title="Chụp ảnh màn hình"
        />
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
      <q-card-section id="screenshotDetailSection" style="max-height: 60vh; overflow-y: auto">
        <div class="">
          <q-markup-table flat wrap-cells class="text-grey-8">
            <thead>
              <tr>
                <th class="text-left" style="width: 50%">Tên bài thi</th>
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
import { snapdom } from '@zumer/snapdom'

const dialogOpen = ref(false)
const studentData = ref(null)

const examScores = computed(() => {
  return studentData.value?.exam_scores?.details || []
})

const open = (student) => {
  studentData.value = student
  dialogOpen.value = true
}

// Helper function to download image
const downloadImage = (dataUrl) => {
  const link = document.createElement('a')
  link.download = `exam-result-${studentData.value?.code || 'screenshot'}-${new Date().toISOString().split('T')[0]}.png`
  link.href = dataUrl
  link.click()
}

const takeModalScreenshot = async () => {
  try {
    // Find modal elements by ID
    const modalCard = document.getElementById('screenshotModalCard')

    if (modalCard) {
      // Clone DOM element to work on copy
      const modalCardClone = modalCard.cloneNode(true)

      // Remove max-height constraint on cloned element
      modalCardClone.style.maxHeight = 'none'

      // Find the corresponding detail section within the cloned modal card
      const clonedDetailSection = modalCardClone.querySelector('#screenshotDetailSection')
      if (clonedDetailSection) {
        clonedDetailSection.style.maxHeight = 'none'
      }

      // Create a temporary container for the cloned element
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '-9999px'
      tempContainer.style.width = modalCard.scrollWidth + 'px'
      tempContainer.appendChild(modalCardClone)
      document.body.appendChild(tempContainer)

      // Wait for DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await snapdom(modalCardClone, {
        scale: 1, // Higher quality
        backgroundColor: '#ffffff',
      })

      // Clean up temporary container
      document.body.removeChild(tempContainer)

      // Convert to blob and share via Web Share API
      const blob = await result.toBlob({ type: 'image/png' })

      try {
        await navigator.share({
          title: `Chi tiết điểm thi - ${studentData.value?.saint_name || ''} ${studentData.value?.full_name || ''}`,
          text: `Chi tiết điểm thi của học viên ${studentData.value?.code || ''}`,
          files: [new File([blob], 'exam-result.png', { type: 'image/png' })],
        })
      } catch (shareError) {
        console.error('Share failed:', shareError)
        // Fallback to download if share fails
        const url = URL.createObjectURL(blob)
        downloadImage(url)
      }
    }
  } catch (error) {
    console.error('Error taking screenshot:', error)
  }
}

defineExpose({
  open,
})
</script>
