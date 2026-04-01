<template>
  <q-dialog v-model="dialogOpen">
    <q-card class="full-width" style="max-height: 90vh">
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
                    <div class="row justify-center q-gutter-md">
                      <div class="text-center">
                        <div class="text-body2 text-weight-bold text-positive">
                          {{ studentData.attendances?.mass_total_present || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Hiện diện</div>
                      </div>
                      <div class="text-center">
                        <div class="text-body2 text-weight-bold text-warning">
                          {{ studentData.attendances?.mass_total_leave || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng phép</div>
                      </div>
                      <div class="text-center">
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
                    <div class="row justify-center q-gutter-md">
                      <div class="text-center">
                        <div class="text-body2 text-weight-bold text-positive">
                          {{ studentData.attendances?.lesson_total_present || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Hiện diện</div>
                      </div>
                      <div class="text-center">
                        <div class="text-body2 text-weight-bold text-warning">
                          {{ studentData.attendances?.lesson_total_leave || 0 }}
                        </div>
                        <div class="text-caption text-grey-6">Vắng phép</div>
                      </div>
                      <div class="text-center">
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
      <q-card-section style="max-height: 60vh; overflow-y: auto">
        <div class="">
          <q-markup-table flat dense>
            <thead>
              <tr>
                <th class="text-left">Ngày</th>
                <th class="text-center">Thánh lễ</th>
                <th class="text-center">Giáo lý</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="attendance_entry in attendanceEntries"
                :key="`${studentData?.code}-${attendance_entry.date}`"
              >
                <td class="text-left">
                  <div class="text-caption text-grey-8">
                    {{ date.formatDate(attendance_entry.date, 'dddd', dateLocales) }}
                  </div>
                  <div>
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

const dialogOpen = ref(false)
const studentData = ref(null)

const attendanceEntries = computed(() => {
  return studentData.value?.attendances?.details || []
})

const open = (student) => {
  studentData.value = student
  dialogOpen.value = true
}

defineExpose({
  open,
})
</script>
