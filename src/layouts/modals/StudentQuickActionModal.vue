<template>
  <q-dialog v-model="dialogOpen" class="full-width" position="bottom">
    <q-card class="full-width">
      <q-card-section class="q-mx-md row items-center q-pb-none">
        <div class="text-h5 text-weight-regular text-center full-width">Học viên</div>
        <div class="text-caption text-center full-width">GL2025-HV0001</div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Mã học viên</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Mã học viên</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Tên thánh</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Maria Madalêna</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Họ tên</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Nguyễn Quỳnh Yến Thảo Nhi</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label><span class="text-bold">Giới tính</span></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>Nữ</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-separator />
      </q-card-section>

      <q-card-section class="q-mx-md q-gutter-y-md">
        <div class="text-subtitle2 text-center full-width q-mt-none">Thao tác nhanh</div>
        <q-btn
          icon="mdi-information"
          class="full-width"
          outline
          color="primary"
          label="Xem thông tin học viên"
          to="/students/GL2025-HV0001"
        />
        <q-btn
          class="full-width"
          outline
          color="positive"
          icon="mdi-check-circle-outline"
          label="Điểm danh học viên"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialogOpen = ref(false)

const open = () => {
  dialogOpen.value = true
}

defineExpose({
  open,
})
</script>
