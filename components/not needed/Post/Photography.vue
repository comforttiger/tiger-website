<template>
  <div>
    <!-- <img :src="post.photos[0]" /> -->
    <div class="columns-2 gap-2">
      <div class="flex flex-col gap-2">
    <img v-for="photo in post.photos" :src="photo" />
    </div>
    </div>
    <h3 class="text-3xl font-display text-accent">{{ post.title }}</h3>
    <div class="flex gap-2 text-accent">
      <DateComponent :date="post.date" class="italic" /> <span>~</span>
      <span>{{ post.category }}</span>
    </div>
    <p class="text-accent">📷 {{ post.taken_with }}</p>
    <p>{{ post.description }}</p>
    <NuxtLink
      :to="`/made/photography#${post.identifier}`"
      class="underline text-secondary"
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
