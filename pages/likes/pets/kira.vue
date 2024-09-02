<template>
  <div class="md:p-20">
    <LikesTitle page="pets" sub_page="kira"> kira </LikesTitle>

    <div>
      <ContentList :query="query" v-slot="{ list }">
        <div class="lg:columns-md columns-2xs gap-8">
          <div v-for="picture in list" :key="picture._path" class="pb-8">
            <PetsCard :picture="picture" />
          </div>
        </div>
      </ContentList>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
  const query: QueryBuilderParams = {
    path: "/likes/pets/kira",
    sort: [{ date: -1 }]
  };
  
  useSeoMeta({
    title: "kira",
    ogTitle: "kira",
    description: "pictures of my cat, kira!",
    ogDescription: "pictures of my cat, kira!",
  });
  </script>