<template>
  <div
    class="bg-base-100 rounded-xl p-5 border-l-4 border-accent overflow-hidden"
  >
    <div v-if="post.photos" class="lg:columns-md columns-2xs gap-2">
      <img v-for="photo in post.photos" :src="photo" class="pb-2" />
    </div>
    <div class="flex w-full justify-center items-center">
      <img v-if="post.image" :src="post.image" :alt="post.image_description" />
    </div>
    <h3 class="text-3xl text-accent font-display">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </h3>
    <DateComponent :date="post.date" class="text-accent italic" />
    <div class="relative" v-if="post.body && post.body.children.length > 0">
      <!-- Gradient effect applied here -->
      <ContentRenderer
        :value="post"
        class="space-y-2 max-h-32 overflow-hidden"
      />
      <div
        class="absolute top-0 left-0 bg-gradient-to-b h-full w-full from-transparent from-85% to-base-100 pointer-events-none"
      ></div>
    </div>
    <NuxtLink :to="post._path" class="underline text-secondary"
      >view post</NuxtLink
    >
    <div>
      <ul class="flex gap-2 mt-5">
        <li v-for="tag in post.tags">
          <NuxtLink :to="`/tagged/${tag}`" class="underline text-secondary"
            >#{{ tag }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
  wide: { type: Boolean, required: false },
});
</script>
