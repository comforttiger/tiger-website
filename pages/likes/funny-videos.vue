<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-1/2 w-screen">
      <LikesTitle page="funny-videos"> funny videos </LikesTitle>
      <div>
        <ContentList :query="query" v-slot="{ list }">
          <div class="flex flex-col gap-5">
            <div
              v-for="post in list"
              :key="post._path"
            >
              <VideoCard :post="post" />
            </div>
          </div>
        </ContentList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/likes/funny-videos",
};

useSeoMeta({
  title: "funny videos",
  ogTitle: "funny videos",
  description: "tiger's collection of her favourite videos",
  ogDescription: "tiger's collection of her favourite videos",
})
</script>
