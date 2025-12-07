<template>
  <div class="q-pa-md">
    <q-table
      :rows="unitDetails.students || []"
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
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width style="padding-right: unset; padding-left: 0.5rem">
            <q-btn
              size="sm"
              flat
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </q-td>
          <q-td key="first_name" :props="props" style="padding-right: unset; padding-left: 0.5rem">
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
          <q-td key="date_of_birth" :props="props" style="padding-left: 0.5rem">
            <div><b>Thánh lễ:</b> 6/10</div>
            <div><b>Giáo lý:</b> 6/10</div>
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
                <tr>
                  <td class="text-left">30/12/2021</td>
                  <td class="text-center">
                    <q-chip color="positive" size="0.7rem" text-color="white"> Hiện diện </q-chip>
                  </td>
                  <td class="text-center">
                    <q-chip color="positive" size="sm" text-color="white"> Hiện diện </q-chip>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">30/12/2021</td>
                  <td class="text-center">
                    <q-chip color="positive" size="sm" text-color="white">
                      <b>Hiện diện</b>
                    </q-chip>
                  </td>
                  <td class="text-center">
                    <q-chip color="negative" size="sm" text-color="white"> Vắng </q-chip>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">30/12/2021</td>
                  <td class="text-center">
                    <q-chip color="negative" size="sm" text-color="white"> Vắng </q-chip>
                  </td>
                  <td class="text-center">
                    <q-chip color="positive" size="sm" text-color="white"> Hiện diện </q-chip>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">30/12/2021</td>
                  <td class="text-center">
                    <q-chip color="positive" size="sm" text-color="white"> Hiện diện </q-chip>
                  </td>
                  <td class="text-center">
                    <q-chip color="warning" size="sm" text-color="white"> Vắng phép </q-chip>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-list>
      <q-item
        v-for="student in unitDetails.students"
        :key="student.code"
        class=""
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> </q-avatar>
        </q-item-section>
<style lang="sass" scoped>
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
</style>
        <q-item-section>
          <q-item-label>{{ getStudentFullName(student) }}</q-item-label>
          <q-item-label caption lines="1">{{ student.code }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { date } from 'quasar'

import { useAppStore } from 'src/stores/app-store'
import { useUnitStore } from 'src/stores/unit-store'

const unitStore = useUnitStore()
const appStore = useAppStore()
const router = useRouter()

const { unitDetails } = storeToRefs(unitStore)
const { resetUnitDetails } = unitStore
const { setPageSubtitle, setPageTitle } = appStore

const columns = [
  {},
  {
    name: 'first_name',
    required: true,
    label: 'Học viên',
    align: 'left',
    field: 'first_name',
    sortable: true,
    class: 'text-left',
  },
  {
    name: 'date_of_birth',
    required: true,
    label: 'Hiện diện',
    align: 'left',
    field: 'date_of_birth',
    sortable: true,
  },
]

onMounted(async () => {
  resetUnitDetails()
  await unitStore.getSpecificUnitDetails(router.currentRoute.value.params.unit_code)
  setPageTitle('Tổng kết')
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
