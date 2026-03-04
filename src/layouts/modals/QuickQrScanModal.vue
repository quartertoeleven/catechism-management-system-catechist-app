<template>
  <q-dialog v-model="dialogOpen" class="full-width" position="bottom">
    <q-card class="full-width">
      <q-card-section class="q-mx-md row items-center q-pb-none">
        <div class="text-h6 text-weight-regular text-center full-width">Quét QR học viên</div>
      </q-card-section>

      <q-card-section>
        <div class="q-mx-md q-pa-sm" style="border: 1px solid rgba(0, 0, 0, 0.12)">
          <QrcodeStream
            @detect="onQRCodeDetected"
            :track="paintDetectionOutline"
            :formats="selectedBarcodeFormats"
            :paused="qrScannerStatus.state === SCANNER_STATE_WAITING"
          />
        </div>

        <q-banner
          class="bg-primary text-white q-mx-md q-mt-md"
          :class="
            qrScannerStatus.state === SCANNER_STATE_ERROR
              ? 'bg-negative'
              : qrScannerStatus.state === SCANNER_STATE_SUCCESS
                ? 'bg-positive'
                : 'bg-primary'
          "
        >
          <template v-slot:avatar>
            <q-spinner v-if="qrScannerStatus.state === SCANNER_STATE_WAITING" size="2rem" />
            <template v-else>
              <q-icon
                v-if="qrScannerStatus.state === SCANNER_STATE_ERROR"
                name="mdi-close-circle-outline"
              />
              <q-icon
                v-if="qrScannerStatus.state === SCANNER_STATE_INFO"
                name="mdi-information-outline"
              />
            </template>
          </template>
          <div class="text-weight-medium">{{ qrScannerStatus.title }}</div>
          <div class="text-caption">{{ qrScannerStatus.description }}</div>
        </q-banner>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const SCANNER_STATE_ERROR = 'error'
const SCANNER_STATE_INFO = 'info'
const SCANNER_STATE_WAITING = 'waiting'

const dialogOpen = ref(false)
const qrScannerStatus = ref({
  state: SCANNER_STATE_INFO,
  title: '',
  description: '',
  icon: 'mdi-information-outline',
})

const barcodeFormats = {
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: true,
  pdf417: false,
  qr_code: true,
  rm_qr_code: true,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false,
}

const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats).filter((format) => barcodeFormats[format])
})

const paintDetectionOutline = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

const open = () => {
  dialogOpen.value = true
  setQRScannerStatusInfo()
}

const setQRScannerStatusMessage = (title, description) => {
  qrScannerStatus.value.title = title
  qrScannerStatus.value.description = description
}

// const setQRScannerStatusError = (title, description, resetInterval = 3) => {
//   qrScannerStatus.value.state = SCANNER_STATE_ERROR
//   setQRScannerStatusMessage(title, description)
//   setTimeout(() => {
//     setQRScannerStatusInfo()
//   }, resetInterval * 1000)
// }

const setQRScannerStatusInfo = (
  title = 'Đưa QR code của học viên vào trong khung',
  description,
) => {
  qrScannerStatus.value.state = SCANNER_STATE_INFO
  setQRScannerStatusMessage(title, description)
}

defineExpose({
  open,
})
</script>
