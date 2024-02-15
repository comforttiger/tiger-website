<template>
  <div class="md:p-20">
    <MadeTitle page="art">tiger's art :3</MadeTitle>
    <ContentList :query="query" v-slot="{ list }">
      <div class="lg:columns-md columns-2xs gap-8">
        <div v-for="post in list" :key="post._path">
          <div class="gap-8 flex flex-col pb-8" :id="post.title">
            <img :src="post.image" :alt="post.image_description" />
          </div>
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const route = useRoute();

const query: QueryBuilderParams = {
  path: "/made/art",
  sort: [{ date: -1 }],
};
</script>
