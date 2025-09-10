<template>
    <div class="window-height flex column flex-center fixed-center" style="width: 75vw;">
        <div class="text-center q-mb-xl">
            <h1 class="text-h4 text-weight-bold q-mb-sm">Quan ly giao ly</h1>
            <p>Ung dung danh cho Giao Ly Vien</p>
        </div>
        <div class="full-width">
            <q-form class="q-gutter-y-md">
                <q-input class="full-width" outlined label="Login ID" />
                <q-input class="full-width" outlined label="Password" type="password" />
                <div class="">
                    <q-btn class="full-width" type="submit" color="primary" label="Login" no-caps />
                </div>
            </q-form>
        </div>
        <div class="q-mt-xl full-width text-center text-caption">
            <div>Phát triển bởi <span class="text-weight-bold">Quarter To Eleven</span></div>
            <sub>Phiên bản: 0.0.1</sub>
        </div>
    </div>

</template>

<script setup>
//
</script>
