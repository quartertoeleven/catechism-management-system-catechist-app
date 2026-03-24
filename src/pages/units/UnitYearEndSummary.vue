<template>
  <div class="q-pa-md q-gutter-md">
    <q-select
      dropdown-icon="mdi-menu-down"
      outlined
      :options="sortingByOptions"
      map-options
      emit-value
      v-model="selectedSortingBy"
      label="Sắp xếp theo"
    >
      <template v-slot:after>
        <q-btn
          color="primary"
          :icon="isSortAscending ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
          class="full-height"
          @click="onChangeSortingOrder"
        />
      </template>
    </q-select>
    <q-list bordered separator>
      <q-expansion-item>
        <template #header>
          <q-item-section avatar>
            <q-icon color="" size="lg" name="mdi-face-man" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Phero Nguyen Hoang Duy Tan Khang</q-item-label>
            <q-item-label caption lines="1">GL2025-HV099</q-item-label>
          </q-item-section>
        </template>
        <q-card>
          <div class="q-gutter-y-md">
            <div class="q-pt-sm">
              <apexchart
                width="100%"
                height="200"
                :options="chartData.chartOptions"
                :series="chartData.series"
              />
            </div>
            <div class="full-width text-center">
              <div class="text-h6 text-weight-bold">Diem trung binh</div>
              <q-circular-progress
                :value="(100 / 10) * 5"
                size="30vw"
                color="positive"
                class="q-ma-md"
                show-value
                track-color="grey-3"
              >
                5.0
              </q-circular-progress>
            </div>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from 'src/stores/app-store'

const appStore = useAppStore()

const selectedSortingBy = ref('first_name')
const isSortAscending = ref(true)
const sortingByOptions = [
  {
    label: 'Tên học viên',
    value: 'first_name',
  },
  {
    label: 'Mã học viên',
    value: 'code',
  },
  {
    label: 'Hiện diện (thánh lễ & giáo lý)',
    value: 'attendance_both',
  },
  {
    label: 'Hiện diện thánh lễ',
    value: 'attendance_mass',
  },
  {
    label: 'Hiện diện giáo lý',
    value: 'attendance_lesson',
  },
  {
    label: 'Điểm trung bình',
    value: 'avg_score',
  },
]

const chartData = {
  series: [
    {
      name: 'Hiện diện',
      data: [10, 16],
    },
    {
      name: 'Vắng có phép',
      data: [2, 3],
    },
    {
      name: 'Vắng không phép',
      data: [5, 1],
    },
  ],
  chartOptions: {
    title: {
      text: 'Tổng kết chuyên cần',
      align: 'center',

      floating: false,
    },
    colors: ['#21ba45', '#f2c037', '#c10015'],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Thánh lễ', 'Giáo lý'],
      labels: {
        show: false,
      },
    },
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
    },
    dataLabels: {},
  },
}

onMounted(() => {
  appStore.setPageTitle('Tổng kết năm học')
  appStore.setPageSubtitle('Lop Vao Doi 1A')
})

const onChangeSortingOrder = () => {
  isSortAscending.value = !isSortAscending.value
}
</script>
