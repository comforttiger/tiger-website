<template>
    <div>
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.image_description"
      />
      <iframe v-if="post.video" :src="post.video" class="w-full aspect-video" ></iframe>
      <h3 class="text-3xl text-accent">{{ post.title }}</h3>
      <div class="flex gap-2 text-accent">
      <DateComponent :date="post.date" class="italic" /> <span>~</span> <span>{{ post.category }}</span>
      </div>
      <p>{{ post.description }}</p>
      <NuxtLink :to="post.url" class="underline text-secondary">check it out on {{ post.url_platform }}</NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
  
  defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true },
  });
  </script>