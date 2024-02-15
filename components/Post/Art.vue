<template>
  <div>
      <img :src="post.image" :alt="post.image_description" />
      <h3 class="text-3xl font-display text-accent">{{ post.title }}</h3>
      <div class="flex gap-2 text-accent">
        <DateComponent :date="post.date" class="italic" /> <span>~</span>
        <span>{{ post.category }}</span>
      </div>
      <NuxtLink to="/made/art" class="underline text-secondary">see more</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
