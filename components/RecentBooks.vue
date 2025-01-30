<template>
<div class="bg-base-100 rounded-xl p-5 flex flex-col gap-5">
<h2 class="text-primary text-4xl font-display text-center"><NuxtLink to="/reading">currently reading</NuxtLink></h2>
<div class="flex gap-2">
    <ContentList :query="query" v-slot="{ list }">
        <NuxtLink v-for="book in list" :to="`/reading#${book._path?.split('/')[2]}`" :key="book._path">
          <img :src="book.image" />
        </NuxtLink>
    </ContentList>
</div>
</div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/reading",
  sort: [{ start_timestamp: -1 }],
  // where: [{end_timestamp: { $exists: false}}],
  limit: 3
};
</script>