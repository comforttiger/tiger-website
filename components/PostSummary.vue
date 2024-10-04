<template>
  <div
    class="bg-base-100 rounded-xl p-5 rounded-l-md border-l-4 border-accent flex flex-col gap-5"
  >
    <div class="grid grid-cols-5 gap-2">
      <div
        class="flex items-center justify-center md:col-span-1 col-span-5"
        v-if="post.image || post.photos || post.preview_image"
      >
        <img
          v-if="post.preview_image"
          loading="lazy"
          :src="post.preview_image"
          :alt="post.image_description"
        />
        <div v-else>
          <img
            loading="lazy"
            v-if="post.image"
            :src="post.image"
            :alt="post.image_description"
          />
          <img loading="lazy" v-if="post.photos" :src="post.photos[0]" />
        </div>
      </div>
      <div class="flex items-center md:col-span-4 col-span-5">
        <div>
          <h3 class="text-3xl text-accent font-display pb-2">
            <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
          </h3>
          <Ask v-if="post.ask" :ask="post.ask" />
          <div v-else class="flex flex-col gap-2">
            {{ post.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 flex-wrap">
      <FilledButton class="py-1" v-if="post._path && post._extension == 'md' && post.ask" :url="post._path"
        >view answer</FilledButton
      >
      <FilledButton class="py-1" v-else-if="post._path && post._extension == 'md'" :url="post._path"
        >view post</FilledButton
      >
      <DateComponent
        :timestamp="post.timestamp"
        class="border-accent border-2 px-2 py-1 text-accent bg-base-100 rounded-xl font-display w-fit"
      />
      <Tag v-for="tag in post.tags" :tag="tag" />
    </div>
    <!-- <div>
      <ul class="flex gap-2 mt-5">
        <li v-for="tag in post.tags">
          <Tag :tag="tag" />
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
  big_pics: { type: Boolean, required: false },
});
</script>
