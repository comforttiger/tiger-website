<template>
  <div>
    <ContentList :query="query" v-slot="{ list }">
      <div class="flex flex-col gap-5">
        <div v-for="post in list" :key="post._path">
          <PostSummary :post="post" />
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const props = defineProps({
  path: { type: String, required: true },
});

const query: QueryBuilderParams = {
  path: props.path,
  sort: [{ date: -1 }],
};
</script>
