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
        <span v-if="post.created" class="italic">updated</span> <DateComponent :date="post.date" class="italic"/> <span>~</span> <span>{{ post.category }} <span v-if="post.sub_category">~ {{ post.sub_category }}</span> </span>
      </div>
      <p>{{ post.description }}</p>
      <NuxtLink :to="post.url" class="underline text-secondary" external>check it out</NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
  
  defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true },
  });
  </script>