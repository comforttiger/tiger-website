<template>
  <div>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path" class="pl-5">
        <h3 class="text-2xl text-primary">{{ post.title }}</h3>
        <p class="italic">{{ post.date }}</p>
        <p>{{ post.description }}</p>
        <NuxtLink :to="post._path" class="underline text-accent"
          >read more...</NuxtLink
        >
      </div>
    </ContentList>

    <NuxtLink to="/posts" class="underline text-accent"
      >see all posts here</NuxtLink
    >
  </div>
  <!-- <div class="flex flex-wrap gap-2">
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path">
        <PostCard :title="post.title" :description="post.description" :url="post._path" :date="post.date" />
      </div>
    </ContentList>
  </div> -->
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = {
  path: "/posts",
  limit: 3,
  sort: [{ date: -1 }],
};
</script>
