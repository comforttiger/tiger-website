<template>
  <div class="w-full flex items-center justify-center">
    <div class="flex flex-col gap-2 md:w-2xl w-2xl justify-center items-center">
       <Ask :ask="ask" v-for="ask in asks" class="max-w-2xl"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";


const asks = ref<ParsedContent[]>([]);

asks.value = await queryContent(`/asks`)
  .sort({ timestamp: -1 })
  .find();

// let ask = askQuery ? askQuery._path?.split('/').at(-1) : ''
// if (ask == undefined) {
//     ask = ''
// }
</script>
