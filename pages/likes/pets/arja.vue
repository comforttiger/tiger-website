<template>
  <div class="md:p-20 flex flex-col gap-5">
    <LikesTitle page="pets" sub_page="arja"> arja </LikesTitle>

    <div class="bg-base-100 rounded-xl p-5">
      <p>
        arja was born 2007/07/07, and passed away 2017/12/08. she's toya's great
        grandmother.
      </p>
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
  path: "/likes/pets/arja",
  sort: [{ date: -1 }],
};

useSeoMeta({
  title: "arja",
  ogTitle: "arja",
  description: "pictures of my dog, arja!",
  ogDescription: "pictures of my dog, arja!",
});
</script>
