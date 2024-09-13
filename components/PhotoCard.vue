<template>
  <div class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
    <div class="lg:columns-xl columns-2xs gap-2">
        <div class="flex flex-col gap-2">
          <img v-for="photo in photos.photos" :src="photo" />
        </div>
      </div>
    <DateComponent :date="photos.date" class="italic text-accent" />
    <p class="text-accent">📷 {{photos.taken_with}}</p>
    <p>{{ photos.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  photos: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
