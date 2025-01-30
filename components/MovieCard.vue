<template>
  <div
    class="bg-base-100 rounded-xl p-5 rounded-l-md border-l-4 border-primary flex flex-col gap-5"
  >
    <div class="grid-cols-5 grid gap-2">
      <div
        class="flex col-span-1"
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
        </div>
      </div>
      <div class="flex items-center col-span-4">
        <div>
          <h3 class="text-3xl text-primary font-display pb-2">
            <NuxtLink :to="post._path" v-if="!post.no_title">{{ post.title }}</NuxtLink>
          </h3>
          <div>
            <ContentRenderer :value="post" class="space-y-2" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 flex-wrap">
      <FilledButton
        class="py-1"
        :url="post._path"
        >view comments</FilledButton
      >
      <DateComponent
        v-if="post.timestamp"
        :timestamp="post.timestamp"
        class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display w-fit"
      />
      <div v-else class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display w-fit">
        <DateComponent :timestamp="post.start_timestamp" /> — <DateComponent :timestamp="post.end_timestamp" v-if="post.end_timestamp" />
      </div>
      <ul v-for="tag in post.watch_tags" class="h-fit">
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

defineProps({
  post: { type: Object as PropType<ParsedContent>, required: true },
  selected: { type: Array<String>, required: false },
});

const emit = defineEmits(['tag-clicked']);

const emitTag = (tag: string) => {
  emit('tag-clicked', tag);
};
</script>
