<template>
  <div class="flex flex-col gap-2">
    <div v-if="tag" class="rounded-xl bg-base-100 p-5">
      <OutlineButton url="/" class="flex gap-2 w-fit"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>

        view all posts</OutlineButton
      >
      <h2 class="text-primary text-4xl font-display">
        posts tagged #{{ tag }}
      </h2>
    </div>
    <div v-else class="rounded-xl bg-base-100 p-5">
      <h2 class="text-primary text-4xl font-display">all posts</h2>
    </div>
    <ContentList :query="query" v-slot="{ list }">
      <div class="flex flex-col gap-8">
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
  tag: { type: String, required: false },
});

const query: QueryBuilderParams = {
  path: "/",
  sort: [{ date: -1 }],
  where: [{ tags: { $exists: true } }, { tags: { $contains: props.tag } }],
};
</script>
