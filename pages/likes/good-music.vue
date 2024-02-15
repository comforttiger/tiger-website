<template>
    <div class="w-full flex items-center justify-center flex-col">
      <div class="md:w-2/3 w-screen">
        <LikesTitle page="good-music"> good music </LikesTitle>
        <div>
          <ContentList :query="query" v-slot="{ list }">
            <div class="flex flex-col gap-5">
              <div
                v-for="artist in list"
                :key="artist._path"
                class="pl-5 border-l-4 border-accent"
              >
                <MusicCard :artist="artist" />
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
    path: "/likes/good-music",
  };
  </script>