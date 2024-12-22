<template>
<div class="bg-base-100 rounded-xl p-5 flex flex-col gap-5">
<h2 class="text-primary text-4xl font-display text-center"><NuxtLink to="/watching">recently watched</NuxtLink></h2>
<div class="flex gap-4">
    <ContentList :query="query" v-slot="{ list }">
        <NuxtLink v-for="movie in list" :to="`/watching#${movie._path?.split('/')[2]}`" :key="movie._path">
          <img :src="movie.image" />
        </NuxtLink>
    </ContentList>
</div>
</div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/watching",
  sort: [{ timestamp: -1 }],
  limit: 4
};
</script>