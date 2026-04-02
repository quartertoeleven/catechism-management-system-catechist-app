<template>
  <q-dialog v-model="dialogOpen">
    <q-card id="screenshotModalCard" class="full-width" style="max-height: 90vh">
      <q-card-section class="row items-center q-pb-none">
        <div class="col">
          <div class="text-h6 text-weight-regular">Chi tiết điểm danh</div>
          <div class="text-caption text-grey-7" v-if="studentData">
            {{ studentData.saint_name }} {{ studentData.full_name }}
            <br />
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
      <q-card-section v-if="studentData" class="text-center q-px-md">
        <div class="row justify-center">
          <div class="col-12">
            <q-markup-table bordered separator="cell" flat class="full-width">
              <tbody>
                <tr>
                  <td
                    class="text-left text-caption text-weight-bold text-grey-7"
                    style="vertical-align: middle"
                  >
                    Thánh lễ
                  </td>
                  <td class="text-center" style="vertical-align: middle">
                    <div class="row justify-center q-gutter-sm attendance-summary">
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-positive">
                          {{ studentData.attendances?.mass_total_present || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Hiện diện</div>
                      </div>
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-warning">
                          {{ studentData.attendances?.mass_total_leave || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng phép</div>
                      </div>
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-negative">
                          {{ studentData.attendances?.mass_total_absent || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-left text-caption text-weight-bold text-grey-7"
                    style="vertical-align: middle"
                  >
                    Giáo lý
                  </td>
                  <td class="text-center" style="vertical-align: middle">
                    <div class="row justify-center q-gutter-sm attendance-summary">
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-positive">
                          {{ studentData.attendances?.lesson_total_present || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Hiện diện</div>
                      </div>
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-warning">
                          {{ studentData.attendances?.lesson_total_leave || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng phép</div>
                      </div>
                      <div class="text-center attendance-item">
                        <div class="text-body2 text-weight-bold text-negative">
                          {{ studentData.attendances?.lesson_total_absent || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </q-card-section>
      <q-card-section id="screenshotDetailSection" style="max-height: 60vh; overflow-y: auto">
        <div class="full-width">
          <q-markup-table flat dense wrap-cells class="attendance-table full-width text-grey-8">
            <thead>
              <tr>
                <th class="text-left" style="width: 35%">Ngày</th>
                <th class="text-center" style="width: 32.5%">Thánh lễ</th>
                <th class="text-center" style="width: 32.5%">Giáo lý</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="attendance_entry in attendanceEntries"
                :key="`${studentData?.code}-${attendance_entry.date}`"
              >
                <td class="text-left">
                  <div class="text-caption">
                    {{ date.formatDate(attendance_entry.date, 'dddd', dateLocales) }}
                  </div>
                  <div class="text-caption text-weight-bold">
                    {{ date.formatDate(attendance_entry.date, 'DD/MM/YYYY', dateLocales) }}
                  </div>
                </td>
                <td class="text-center">
                  <q-chip
                    v-if="attendance_entry.mass_status === 'present'"
                    color="positive"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Hiện diện
                  </q-chip>
                  <q-chip
                    v-if="attendance_entry.mass_status === 'leave'"
                    color="warning"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Vắng phép
                  </q-chip>
                  <q-chip
                    v-if="attendance_entry.mass_status === 'absent'"
                    color="negative"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Vắng
                  </q-chip>
                  <q-chip
                    v-if="!attendance_entry.mass_status"
                    color="grey"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    (không tính)
                  </q-chip>
                </td>
                <td class="text-center">
                  <q-chip
                    v-if="attendance_entry.lesson_status === 'present'"
                    color="positive"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Hiện diện
                  </q-chip>
                  <q-chip
                    v-if="attendance_entry.lesson_status === 'leave'"
                    color="warning"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Vắng phép
                  </q-chip>
                  <q-chip
                    v-if="attendance_entry.lesson_status === 'absent'"
                    color="negative"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    Vắng
                  </q-chip>
                  <q-chip
                    v-if="!attendance_entry.lesson_status"
                    color="grey"
                    size="0.7rem"
                    text-color="white"
                    class="text-weight-bold"
                  >
                    (không tính)
                  </q-chip>
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
import { date } from 'quasar'
import { dateLocales } from 'src/helpers/constants'
import { snapdom } from '@zumer/snapdom'

const dialogOpen = ref(false)
const studentData = ref(null)

const attendanceEntries = computed(() => {
  return studentData.value?.attendances?.details || []
})

const open = (student) => {
  studentData.value = student
  dialogOpen.value = true
}

// Helper function to download image
const downloadImage = (dataUrl) => {
  const link = document.createElement('a')
  link.download = `attendance-detail-${studentData.value?.code || 'screenshot'}-${new Date().toISOString().split('T')[0]}.png`
  link.href = dataUrl
  link.click()
}

const takeModalScreenshot = async () => {
  try {
    // Find modal elements by ID
    const modalCard = document.getElementById('screenshotModalCard')

    if (modalCard) {
      // Clone DOM elements to work on copy
      const modalCardClone = modalCard.cloneNode(true)

      // Remove max-height constraints on cloned element
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
        // width: 1000,
        // height: modalCard.scrollHeight,
      })

      // Clean up temporary container
      document.body.removeChild(tempContainer)

      // Convert to blob and share via Web Share API
      const blob = await result.toBlob({ type: 'image/png' })

      try {
        await navigator.share({
          title: `Chi tiết điểm danh - ${studentData.value?.saint_name || ''} ${studentData.value?.full_name || ''}`,
          text: `Chi tiết điểm danh của học viên ${studentData.value?.code || ''}`,
          files: [new File([blob], 'attendance-detail.png', { type: 'image/png' })],
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

<style scoped>
.attendance-table {
  table-layout: fixed;
  width: 100%;
}

.attendance-table th,
.attendance-table td {
  white-space: normal;
  word-wrap: break-word;
}

.attendance-table .q-chip {
  font-size: 0.6rem;
  max-width: 100%;
}

@media (max-width: 600px) {
  .attendance-table .q-chip {
    font-size: 0.5rem;
    padding: 2px 6px;
  }
}

.attendance-summary {
  flex-wrap: nowrap !important;
  min-width: 0;
}

.attendance-item {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
}

@media (max-width: 400px) {
  .attendance-item .text-body2 {
    font-size: 0.9rem;
  }

  .attendance-item .text-caption {
    font-size: 0.65rem;
  }
}

@media (max-width: 320px) {
  .attendance-item .text-body2 {
    font-size: 0.8rem;
  }

  .attendance-item .text-caption {
    font-size: 0.6rem;
  }
}
</style>
