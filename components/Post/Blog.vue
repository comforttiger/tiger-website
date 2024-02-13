<template>
  <div>
    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.image_description"
    />
    <h3 class="text-2xl text-primary">{{ post.title }}</h3>
    <div class="flex gap-2">
    <DateComponent :date="post.date" class="italic" /> <span>~</span> <span>{{ post.category }}</span>
    </div>
    <p>{{ post.description }}</p>
    <NuxtLink :to="post._path" class="underline text-accent"
      >read more...</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
