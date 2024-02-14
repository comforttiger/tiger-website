<template>
  <div class="p-10">
    <h1 class="text-7xl text-primary text-center pb-20">tiger's photos :3</h1>
    <ContentList :query="query" v-slot="{ list }">
      <div class="lg:columns-md columns-2xs gap-8">
      <div v-for="post in list" :key="post._path">
        <div class="gap-8 flex flex-col pb-8" :id="post.title">
          <img v-for="photo in post.photos" :src="photo" :onclick="`showModal(${photo})`" />
        </div>
      </div>
      </div>
    </ContentList>
  </div>
  <!-- <div class="p-10">
    <h1 class="text-7xl text-primary text-center pb-20">tiger's photos :3</h1>
    <ContentList :query="query" v-slot="{ list }">
      <div class="flex flex-wrap gap-5">
        <div v-for="post in list" :key="post._path">
          <h2 class="text-4xl text-accent" :id="post.title">
            <DateComponent :date="post.date" />
          </h2>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="photo in post.photos">
              <img :src="photo" />
            </div>
          </div>
        </div>
      </div>
    </ContentList>
  </div> -->
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const route = useRoute()

const query: QueryBuilderParams = {
  path: "/made/photography",
  sort: [{ date: -1 }],
};
</script>