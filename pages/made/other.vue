<template>
    <div class="w-full flex items-center justify-center flex-col">
  <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
    <MadeTitle category="other">other stuff</MadeTitle>
    <AllPosts path="/made/other" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
// const route = useRoute();

// const query: QueryBuilderParams = {
//   path: "/made/games",
//   sort: [{ date: -1 }],
// };

useSeoMeta({
  title: "other stuff",
  ogTitle: "other stuff",
  description: "uncategorizable stuff i've made",
  ogDescription: "uncategorizable stuff i've made",
})
</script>
