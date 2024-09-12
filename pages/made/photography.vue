<template>
  <div class="md:p-20">
    <MadeTitle category="photography">tiger's photos :3</MadeTitle>
    <ContentList :query="query" v-slot="{ list }">
      <div class="flex flex-col gap-5">
      <div v-for="post in list" :key="post._path" :id="post.identifier">
        <PhotoCard :photos="post" />
      </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const route = useRoute();

const query: QueryBuilderParams = {
  path: "/made/photography",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "tiger's photos",
  ogTitle: "tiger's photos",
  description: "nice fotos tiger",
  ogDescription: "nice fotos tiger",
});
</script>
