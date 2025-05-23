<template>
  <div
    class="bg-base-100 rounded-xl p-5 rounded-l-md border-l-4 border-primary flex flex-col gap-2"
  >
  <div class="flex w-full">
        <img
          loading="lazy"
          v-if="post.image"
          :src="post.image"
          :alt="post.image_description"
        />
      </div>
      <div
        v-if="post.photos"
      >
        <PhotosViewer :photos="post.photos" :first="post.first" />
      </div>

      <h3 class="text-3xl text-accent font-display pb-2">
        <NuxtLink :to="post._path" v-if="!post.no_title">{{
          post.title
        }}</NuxtLink>
      </h3>

      <Ask v-if="ask" :ask="ask" class="max-w-xl ask" />

      <div class="relative" v-if="post.body && post.body.children.length > 0">
        <ContentRenderer :value="post" class="space-y-2 overflow-hidden max-h-32" />
        <div
          class="absolute top-0 left-0 bg-gradient-to-b h-full w-full from-transparent from-85% to-base-100 pointer-events-none"
        ></div>
      </div>
    <div class="flex gap-2 flex-wrap">
      <FilledButton
        class="py-1"
        v-if="post._path && post._extension == 'md'"
        :url="post._path"
        >view post</FilledButton
      >
      <DateComponent
        :timestamp="post.timestamp"
        class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display w-fit"
      />
      <ul v-for="tag in post.tags" class="h-fit">
        <li
          v-if="selected ? selected.includes(tag) : false"
          class="border-primary border-2 px-2 py-1 text-base-100 bg-primary rounded-xl font-display h-fit hover:cursor-pointer hover:brightness-95"
          @click="emitTag(tag)"
        >
          #{{ tag }}
        </li>
        <li
          v-else
          class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display h-fit hover:cursor-pointer hover:bg-primary hover:text-base-100"
          @click="emitTag(tag)"
        >
          #{{ tag }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

const props = defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
  ask: { type: Object as PropType<ParsedContent>, required: false },
  selected: { type: Array<String>, required: false },
});

function grids(isShort: boolean) {
  return isShort ? "grid-cols-1" : "grid-cols-5";
}

function center(isShort: boolean) {
  return isShort ? "" : "justify-center";
}

const emit = defineEmits(["tag-clicked"]);

const emitTag = (tag: string) => {
  emit("tag-clicked", tag);
};
</script>
