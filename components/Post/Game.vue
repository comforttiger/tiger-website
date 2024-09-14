<template>
    <div>
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.image_description"
      />
      <iframe v-if="post.video" :src="post.video" class="w-full aspect-video" ></iframe>
      <h3 class="text-3xl font-display text-accent">{{ post.title }}</h3>
      <div class="flex gap-2 text-accent">
      <DateComponent :date="post.date" class="italic" /> <span>~</span> <span>{{ post.category }}</span>
      </div>
      <p>{{ post.description }}</p>
      <NuxtLink :to="post._path" class="underline text-secondary">read more</NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
  
  defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true },
  });
  </script>