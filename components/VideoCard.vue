<template>
    <div>
      <iframe :src="post.url" class="w-full aspect-video" ></iframe>
      <h3 class="text-3xl text-accent">{{ post.title }}</h3>
      <p>{{ post.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
  
  defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true },
  });
  </script>