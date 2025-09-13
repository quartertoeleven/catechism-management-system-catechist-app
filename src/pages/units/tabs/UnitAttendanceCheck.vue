<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-select
        outlined
        dense
        v-model="selectedDate"
        :options="attendanceDateOptions"
        label="Ngày điểm danh"
      />
      <q-select
        outlined
        dense
        v-model="selectedType"
        :options="attendanceTypeOptions"
        label="Loại điểm danh"
        :disable="!selectedDate"
      />
    </div>
  </div>

  <q-separator inset />

  <div class="q-mx-md q-mb-md">
    <div class="text-center bg-primary">
      <div class="q-mt-md q-pt-md text-weight-bold text-white">ĐIỂM DANH THEO DANH SÁCH LỚP</div>
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="white"
        padding
        arrows
        height="20rem"
        class="bg-primary text-white"
      >
        <q-carousel-slide
          v-for="n in 30"
          :key="n"
          :name="`slide-${n}`"
          class="column no-wrap flex-center"
        >
          <div class="q-mt-md text-center">
            <div>Maria Gorreti</div>
            <div class="text-h5 text-weight-bold">Nguyễn Đào Thanh Kim Nhật</div>
            <div class="text-subtitle2">GL2025-HS0001</div>
          </div>
          <div class="q-mt-md q-gutter-md full-width">
            <q-btn-toggle
              v-model="attendanceStatus"
              spread
              no-caps
              :options="attendanceOptions"
              :toggle-color="attendanceStatus === 'present' ? 'positive' : 'negative'"
              color="white"
              text-color="primary"
            />
          </div>
          <div class="q-mt-md flex" v-if="attendanceStatus === 'absence'">
            <q-checkbox v-model="isNotifiedAbsence" label="Vắng có phép" color="negative" dark />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>

  <q-separator inset />

  <div class="q-mt-md q-mx-md">
    <q-btn class="full-width" color="primary" icon="qr_code" label="Điểm danh sử dụng QR" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref(null)
const selectedType = ref(null)

const attendanceDateOptions = [
  {
    label: '21/09/2025',
    value: '2025-09-21',
  },
  {
    label: '28/09/2025',
    value: '2025-09-28',
  },
  {
    label: '05/10/2025',
    value: '2025-10-05',
  },
]

const attendanceTypeOptions = [
  {
    label: 'Thánh lễ',
    value: 'mass',
  },
  {
    label: 'Giáo lý',
    value: 'lesson',
  },
]

const attendanceOptions = [
  {
    label: 'Hiện diện',
    value: 'present',
  },
  {
    label: 'Vắng',
    value: 'absence',
  },
]

const slide = ref('slide-1')
const attendanceStatus = ref('absence')
const isNotifiedAbsence = ref(false)
</script>
