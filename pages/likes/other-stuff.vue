<template>
    <div class="w-full flex items-center justify-center flex-col">
      <div class="md:w-1/2 w-screen min-h-screen">
        <LikesTitle page="other-stuff"> other stuff </LikesTitle>
        <div>
          <ContentList :query="query" v-slot="{ list }">
            <div class="flex flex-col gap-5">
              <div
                v-for="post in list"
                :key="post._path"
                class="pl-5 border-l-4 border-accent"
              >
                <StuffCard :post="post" />
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
    path: "/likes/other-stuff",
  };
  </script>