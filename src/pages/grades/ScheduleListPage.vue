<template>
  <div class="q-pa-md">
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
          label="Thêm ngày sinh hoạt"
          class="full-height full-width"
          @click="gradeScheduleDetailsModalRef.open()"
        />
      </div>
    </div>

    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="schedule in gradeSchedules || []"
        :key="schedule.id"
        @click="openGradeScheduleForEdit(schedule)"
      >
        <q-item-section>
          <q-item-label
            class="text-caption ellipsis"
            :class="schedule.is_mass_attendance_check ? '' : 'disabled'"
            ><b>Thánh lễ: </b>{{ schedule.mass_content }}</q-item-label
          >
          <q-item-label
            class="text-caption ellipsis"
            :class="schedule.is_lesson_attendance_check ? '' : 'disabled'"
            ><b>Giáo lý: </b>{{ schedule.lesson_content }}</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-weight-bold text-caption">{{
            date.formatDate(schedule.date, 'DD/MM/YYYY')
          }}</q-item-label>
          <q-item-label caption>{{
            date.formatDate(schedule.date, 'dddd', dateLocales)
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round color="" icon="mdi-dots-horizontal" dense @click.prevent.stop="">
            <q-menu>
              <q-list style="min-width: 30vw">
                <q-item clickable v-close-popup v-ripple @click="deleteGradeSchedule(schedule)">
                  <q-item-section avatar>
                    <q-icon color="negative" name="mdi-delete" />
                  </q-item-section>
                  <q-item-section>Xóa</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <GradeScheduleDetailsModal
    ref="gradeScheduleDetailsModalRef"
    :gradeCode="gradeDetails.code"
    :scheduleId="selectedScheduleId"
    @hide="selectedScheduleId = null"
    @closeOnSaveSuccess="() => fetchGradeSchedules(gradeDetails.code)"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { date, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

import { dateLocales } from 'src/helpers/constants'

import { useAppStore } from 'src/stores/app-store'
import { useGradeStore } from 'src/stores/grade-store'

import GradeScheduleDetailsModal from './modals/GradeScheduleDetailsModal.vue'

const $q = useQuasar()
const appStore = useAppStore()
const gradeStore = useGradeStore()
const router = useRouter()

const { setPageSubtitle, setPageTitle } = appStore
const { fetchGradeSchedules, removeGradeSchedule } = gradeStore

const gradeScheduleDetailsModalRef = ref(null)
const { gradeSchedules, gradeDetails } = storeToRefs(gradeStore)
const selectedScheduleId = ref(null)

const openGradeScheduleForEdit = (schedule) => {
  selectedScheduleId.value = schedule.id
  gradeScheduleDetailsModalRef.value.open()
}

const deleteGradeSchedule = async (schedule) => {
  const confirmationDialog = $q.dialog({
    title: 'Xóa lịch sinh hoạt',
    message: `<p>Bạn có chắc muốn xóa lịch sinh hoạt của ngày <b>${date.formatDate(schedule.date, 'dddd - DD/MM/YYYY', dateLocales)}</b> không? </p> <b class="text-negative"><i>Toàn bộ dữ liệu điểm danh của ngày sinh hoạt này cũng sẽ bị xóa.<i/></b>`,
    html: true,
    ok: {
      label: 'Đồng ý xóa',
      flat: true,
      color: 'negative',
      icon: 'mdi-delete',
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
    await removeGradeSchedule(gradeDetails.value.code, schedule.id)
    await fetchGradeSchedules(gradeDetails.value.code)
  })
}

onMounted(async () => {
  await fetchGradeSchedules(router.currentRoute.value.params.grade_code)
  setPageTitle('Lịch sinh hoạt')
  setPageSubtitle(gradeDetails.value.name)
})
</script>
