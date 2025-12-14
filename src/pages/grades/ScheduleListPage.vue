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
        />
      </div>
    </div>

    <q-list bordered separator>
      <q-item clickable v-ripple v-for="schedule in gradeSchedules || []" :key="schedule.id">
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
                <q-item clickable v-close-popup v-ripple>
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
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { date } from 'quasar'

import { useAppStore } from 'src/stores/app-store'
import { useGradeStore } from 'src/stores/grade-store'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const gradeStore = useGradeStore()
const router = useRouter()

const { setPageSubtitle, setPageTitle } = appStore
const { fetchGradeSchedules } = gradeStore

const { gradeSchedules, gradeDetails } = storeToRefs(gradeStore)

const dateLocales = {
  days: ['Chúa Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ Năm', 'Thứ sáu', 'Thứ bảy'],
}

onMounted(async () => {
  await fetchGradeSchedules(router.currentRoute.value.params.grade_code)
  setPageTitle('Lịch sinh hoạt')
  setPageSubtitle(gradeDetails.value.name)
})
</script>
