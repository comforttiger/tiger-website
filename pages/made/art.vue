<!-- <template>
  <div class="md:p-20">
    <MadeTitle category="art">tiger's art :3</MadeTitle>
    <ContentList :query="query" v-slot="{ list }">
      <div class="lg:columns-md columns-2xs gap-8">
        <div v-for="post in list" :key="post._path">
          <div class="gap-8 flex flex-col pb-8" :id="post.id">
            <img :src="post.image" :alt="post.image_description" />
          </div>
        </div>
      </div>
    </ContentList>
  </div>
</template> -->

<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="p-10 xl:w-1/2 w-full flex flex-col gap-10">
      <MadeTitle category="art">tiger's art :3</MadeTitle>
      <ContentList :query="query" v-slot="{ list }">
        <div class="flex flex-col gap-5">
          <div v-for="post in list" :key="post._path" :id="post.identifier">
            <ArtCard :post="post" />
          </div>
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const route = useRoute();

const query: QueryBuilderParams = {
  path: "/made/art",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "tiger's art :3",
  ogTitle: "tiger's art :3",
  description: "art made by a literal tiger",
  ogDescription: "art made by a literal tiger",
});
</script>
