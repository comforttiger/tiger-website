<template>
  <div>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path" class="pl-5">
        <PostSummary :post="post" />
      </div>
    </ContentList>
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
const props = defineProps({
  path: { type: String, required: true },
})

const query: QueryBuilderParams = {
  path: props.path,
  limit: 3,
  sort: [{ date: -1 }],
};
</script>
