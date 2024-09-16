<template>
  <div class="md:p-20">
    <PageTitle class="w-fit"> tiara </PageTitle>

    <div class="w-1/2">
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
