<template>
  <div class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
    <img :src="picture.image" />
    <!-- <h3 class="text-3xl font-display text-accent">{{ picture.date }}</h3> -->
    <DateComponent :timestamp="picture.timestamp" class="italic text-accent" />
    <p>{{ picture.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  picture: { type: Object as PropType<ParsedContent>, required: true },
});
</script>
