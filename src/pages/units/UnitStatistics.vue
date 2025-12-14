<template>
  <div class="q-pa-md">
    <q-table
      :rows="unitAttendanceStatistics || []"
      :columns="columns"
      flat
      bordered
      hide-pagination
      :pagination="{ rowsPerPage: 0 }"
      row-key="code"
      class="bg-transparent"
      table-header-class="bg-grey-3"
      wrap-cells
      dense
      no-data-label="Không có dữ liệu"
      focusable
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click="props.expand = !props.expand" style="cursor: pointer">
          <q-td auto-width style="padding-right: unset; padding-left: 0.5rem">
            <q-btn
              size="sm"
              flat
              dense
              :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </q-td>
          <q-td
            key="student_info"
            :props="props"
            style="padding-right: unset; padding-left: 0.5rem"
          >
            <div class="text-caption text-grey-8">
              {{ props.row.saint_name }}
            </div>
            <div>
              {{ getStudentFullName(props.row) }}
            </div>
            <div class="text-caption text-grey-8">
              {{ props.row.code }}
            </div>
          </q-td>
          <q-td key="attendance_summary" :props="props" style="padding-left: 0.5rem">
            <div>
              <b>Thánh lễ:</b>
              {{
                props.row.attendance_data.filter((item) => item.mass_status === 'present').length
              }}/{{ props.row.attendance_data.filter((item) => item.mass_status).length }}
            </div>
            <div>
              <b>Giáo lý:</b>
              {{
                props.row.attendance_data.filter((item) => item.lesson_status === 'present').length
              }}/{{ props.row.attendance_data.filter((item) => item.lesson_status).length }}
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="padding: unset">
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
                  v-for="attendance_entry in props.row.attendance_data"
                  :key="`${props.row.code}-${attendance_entry.date}`"
                >
                  <td class="text-left">
                    {{ date.formatDate(attendance_entry.date, 'DD/MM/YYYY') }}
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
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { date } from 'quasar'

import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'

const unitStore = useUnitStore()
const appStore = useAppStore()
const router = useRouter()

const { unitDetails, unitAttendanceStatistics } = storeToRefs(unitStore)
const { resetUnitDetails } = unitStore
const { setPageSubtitle, setPageTitle } = appStore

const columns = [
  {},
  {
    name: 'student_info',
    required: true,
    label: 'Học viên',
    align: 'left',
    sortable: true,
    class: 'text-left',
  },
  {
    name: 'attendance_summary',
    required: true,
    label: 'Hiện diện',
    align: 'left',
    field: 'attendance_data',
    sortable: true,
    sort: (a, b) => {
      const totalPresentA =
        a.filter((item) => item.mass_status === 'present').length +
        a.filter((item) => item.lesson_status === 'present').length
      const totalPresentB =
        b.filter((item) => item.mass_status === 'present').length +
        b.filter((item) => item.lesson_status === 'present').length
      return totalPresentA - totalPresentB
    },
  },
]

onMounted(async () => {
  resetUnitDetails()
  await unitStore.fetchUnitAttendanceStatistic(router.currentRoute.value.params.unit_code)
  setPageTitle('Thống kê')
  setPageSubtitle(unitDetails.value.name)
})

const getStudentFullName = (student) => {
  const nameSegments = [student.last_name, student.middle_name, student.first_name]
  const fullNameWithoutEmptySegment = nameSegments.filter((segment) => !!segment)
  return fullNameWithoutEmptySegment.join(' ')
}
</script>

<!-- <style lang="sass" scoped>
:deep(.sticky-column-table)
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */

  thead tr:first-child th:first-chil3d
    /* bg color is important for th; just specify one */
    background-color: $grey-3

  td:first-child
    background-color: $grey-3

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style> -->
