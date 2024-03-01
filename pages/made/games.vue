<template>
    <div class="w-full flex items-center justify-center flex-col">
  <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
    <MadeTitle page="games">tiger's games :3</MadeTitle>
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
        <a :href="post.url" class="underline text-secondary"
          >check it out on {{ post.url_platform }}</a
        >
      </div>
    </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const route = useRoute();

const query: QueryBuilderParams = {
  path: "/made/games",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "tiger's games :3",
  ogTitle: "tiger's games :3",
  description: "games made by a literal tiger",
  ogDescription: "games made by a literal tiger",
})
</script>
