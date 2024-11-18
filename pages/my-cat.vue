<template>
  <div class="md:p-20 flex flex-col gap-2">
    <h1
      class="text-primary font-display text-5xl underline decoration-accent decoration-4 bg-base-100 rounded-xl p-5 w-fit p-name"
    >
      tiara
    </h1>

    <div class="w-full md:w-1/2">
      <ContentList :query="query" v-slot="{ list }">
        <div v-for="picture in list" :key="picture._path" class="pb-8">
          <PetsCard :picture="picture" />
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/my-cat",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "my cat",
  ogTitle: "my cat",
  description: "pictures of my cat, tiara!",
  ogDescription: "pictures of my cat, tiara!",
});
</script>
