<template>
  <div class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
    <img :src="post.image">
    <h3 class="text-3xl font-display text-accent">{{ post.title }}</h3>
    <DateComponent :date="post.date" class="italic text-accent" />
    <p>{{ post.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
