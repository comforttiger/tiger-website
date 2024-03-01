<template>
  <div>
    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.image_description"
    />
    <h3 v-if="post.updated_title" class="text-3xl text-accent font-display">{{ post.updated_title }}</h3>
    <h3 v-else class="text-3xl text-accent font-display">{{ post.title }}</h3>
    <div class="flex gap-2 text-accent">
    <span v-if="post.created" class="italic">updated</span> <DateComponent :date="post.date" class="italic"/> <span>~</span> <span>{{ post.category }} <span v-if="post.sub_category">~ {{ post.sub_category }}</span> </span>
    </div>
    <p>{{ post.description }}</p>
    <NuxtLink v-if="post.link_id" :to="`${post._path}#${post.link_id}`" class="underline text-secondary"
      >read more...</NuxtLink
    >
    <NuxtLink v-else :to="post._path" class="underline text-secondary"
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
