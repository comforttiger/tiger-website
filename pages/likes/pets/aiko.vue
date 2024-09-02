<template>
  <div class="md:p-20 flex flex-col gap-5">
    <LikesTitle page="pets" sub_page="aiko"> aiko </LikesTitle>

    <div class="bg-base-100 rounded-xl p-5">
      <p>aiko was my first ever dog. she was born 2006/12/02, when i was only 6 years old. we had her ever since she was a puppy. she passed away 2019/11/21</p>
      <p>she was the most sweet, loving dog ever.</p>
    </div>

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
    path: "/likes/pets/aiko",
    sort: [{ date: -1 }]
  };
  
  useSeoMeta({
    title: "aiko",
    ogTitle: "aiko",
    description: "pictures of my dog, aiko!",
    ogDescription: "pictures of my dog, aiko!",
  });
  </script>