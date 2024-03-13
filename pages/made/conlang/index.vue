<template>
    <div class="w-full flex items-center justify-center flex-col">
  <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
    <MadeTitle index category="conlang">conlang stuff</MadeTitle>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path" class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.image_description"
        />
        <iframe
          v-if="post.video"
          :src="post.video"
          class="w-full aspect-video"
        ></iframe>
        <h3 class="text-3xl text-accent">{{ post.title }}</h3>
        <DateComponent :date="post.date" class="italic text-accent" />
        <ContentRenderer :value="post" />
      </div>
    </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const query: QueryBuilderParams = {
  path: "/made/conlang",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "conlang-related stuff i made",
  ogTitle: "conlang-related stuff i made",
  description: "i love the conlangs",
  ogDescription: "i love the conlangs",
})
</script>