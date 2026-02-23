<template>
  <q-tabs v-model="currentTab" inline-label align="justify" outside-arrows mobile-arrows>
    <q-tab name="basic" icon="mdi-information" label="Lý lịch" />
    <q-tab name="parent" icon="mdi-human-male-female-child" label="Phụ huynh" />
    <q-tab name="contact" icon="mdi-contacts" label="Liên lạc" />
    <q-tab name="result" icon="mdi-school" label="Học tập" />
  </q-tabs>

  <q-tab-panels
    v-model="currentTab"
    animated
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-tab-panel name="basic">
      <div class="q-qa-md q-gutter-md">
        <q-form class="q-gutter-y-md" @submit.prevent="">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Thong tin chung</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-input class="full-width" outlined label="Ma hoc vien" type="text" />
              <q-input class="full-width" outlined label="Ten Thanh" type="text" />
              <div class="row q-gutter-x-md">
                <div class="col">
                  <q-input class="full-width" outlined label="Ho" type="text" />
                </div>
                <div class="col">
                  <q-input class="full-width" outlined label="Ten dem" type="text" />
                </div>
                <div class="col">
                  <q-input class="full-width" outlined label="Ten" type="text" />
                </div>
              </div>

              <q-input class="full-width" outlined label="Gioi tinh" type="text" />
              <q-input class="full-width" outlined label="Ngay sinh" type="text" />
            </q-card-section>
          </q-card>
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-subtitle2">Thong tin rua toi</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-toggle label="Da duoc rua toi" />
              <q-input class="full-width" outlined label="Ngay rua toi" type="text" />
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </q-tab-panel>

    <q-tab-panel name="parent">
      <q-form class="q-gutter-y-md" @submit.prevent="">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thong tin bo</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Ten Thanh" type="text" />
            <q-input class="full-width" outlined label="Ho ten" type="text" />
            <q-input class="full-width" outlined label="Nghe nghiep" type="text" />
          </q-card-section>
        </q-card>
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Thong tin me</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input class="full-width" outlined label="Ten Thanh" type="text" />
            <q-input class="full-width" outlined label="Ho ten" type="text" />
            <q-input class="full-width" outlined label="Nghe nghiep" type="text" />
          </q-card-section>
        </q-card>
      </q-form>
    </q-tab-panel>

    <q-tab-panel name="contact">
      <q-form class="q-gutter-y-md" @submit.prevent="">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Dia chi moi (sau sap nhap)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input
              class="full-width"
              outlined
              label="Dong 1 (So nha, ten duong, khu pho)"
              type="text"
            />
            <q-input
              class="full-width"
              outlined
              label="Dong 2 (Phuong/xa, thanh pho/tinh)"
              type="text"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2">Dia chi cu (truoc sap nhap)</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input
              class="full-width"
              outlined
              label="Dong 1 (So nha, ten duong, khu pho)"
              type="text"
            />
            <q-input
              class="full-width"
              outlined
              label="Dong 2 (Phuong/xa, quan/huyen, thanh Pho/tinh)"
              type="text"
            />
          </q-card-section>
        </q-card>
      </q-form>

      <q-card class="my-card q-mt-md" flat bordered>
        <q-card-section>
          <div class="text-subtitle2">Thong tin lien lac</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dien thoai</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-email" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Email</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dien thoai</q-item-label>
                <q-item-label caption>Bo</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dien thoai</q-item-label>
                <q-item-label caption>Me</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>0909xxxxxx</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { useAppStore } from 'stores/app-store'
import { onMounted, ref } from 'vue'

const currentTab = ref('basic')

const appStore = useAppStore()
// const router = useRouter()

const { setPageSubtitle, setPageTitle } = appStore

onMounted(() => {
  setPageTitle('Thông tin học viên')
  setPageSubtitle('')
})
</script>
