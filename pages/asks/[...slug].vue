<template>
  <div class="w-full flex items-center justify-center">
    <div class="min-h-screen max-w-3xl flex flex-col">
      <Ask
        :ask="ask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const askQuery = await queryContent(useRoute().path).findOne();

let ask = askQuery ? askQuery._path?.split('/').at(-1) : ''
if (ask == undefined) {
    ask = ''
}
</script>
