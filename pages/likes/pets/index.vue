<template>
    <div class="md:p-20">
      <LikesTitle page="pets" index> pets </LikesTitle>

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
  path: "/likes/pets",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "pets",
  ogTitle: "pets",
  description: "pictures of my pets!",
  ogDescription: "pictures of my pets!",
});
</script>
