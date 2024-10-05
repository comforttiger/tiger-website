<template>
  <div
    class="rounded-xl p-4 border-2 border-accent flex flex-col gap-4 bg-base-100 w-fit"
  >
    <div class="flex gap-4">
      <NuxtLink :to="query.website" v-if="query.website" target="_blank" class="min-h-12 min-w-12">
        <img
        :src="`https://gravatar.com/avatar/${query.email}?s=48&d=https%3A%2F%2Ftiger.kittycat.homes%2Fimages%2Fanon.webp&r=pg`"
        class="rounded-xl w-12 h-12"
      />
      </NuxtLink>
      <img v-else
        :src="`https://gravatar.com/avatar/${query.email}?s=48&d=https%3A%2F%2Ftiger.kittycat.homes%2Fimages%2Fanon.webp&r=pg`"
        class="rounded-xl h-12 w-12"
      />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex gap-1">
        <span class="font-display text-lg"
          ><FilledButton
            v-if="query.website"
            :url="query.website"
            target="_blank"
            >{{ query.name }}</FilledButton
          ><span class="rounded-xl px-2 py-1 text-accent bg-base-100 border-accent border-2 font-display" v-else>{{ query.name }}</span> asked:</span
        >
        </div>
        <ContentRenderer :value="query"></ContentRenderer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
const props = defineProps({
  ask: { type: String, required: true },
});
const query = await queryContent(`/asks/${props.ask}`).findOne();
</script>
