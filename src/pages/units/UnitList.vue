<template>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders">
      <q-item-label header>Lớp của tôi</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1">Vào Đời 1A</q-item-label>
          <q-item-label caption>GL2025-VD1-A</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Các lớp khác trong khối</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="">Vào Đời 1B</q-item-label>
          <q-item-label caption>GL2025-VD1-B</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="">Vào Đời 1C</q-item-label>
          <q-item-label caption>GL2025-VD1-C</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="">Vào Đời 1D</q-item-label>
          <q-item-label caption>GL2025-VD1-D</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
