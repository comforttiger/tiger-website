<template>
  <div>
    <!-- <img :src="post.photos[0]" /> -->
    <div class="columns-2 gap-2">
      <div class="flex flex-col gap-2">
    <img v-for="photo in post.photos" :src="photo" />
    </div>
    </div>
    <div class="flex gap-2">
      <DateComponent :date="post.date" class="italic" /> <span>~</span>
      <span>{{ post.category }}</span>
    </div>
    <NuxtLink
      :to="`/made/photography#${post.title}`"
      class="underline text-accent"
      >see more</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
