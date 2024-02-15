<template>
  <div>
    <NuxtLink :to="post.url">
    <h2 class="text-4xl font-display text-accent">{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
