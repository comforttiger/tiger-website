<template>
  <div
    class="rounded-xl p-4 border-2 border-primary flex flex-col gap-4 bg-base-100 w-fit" v-if="ask"
  >
    <div class="flex gap-2">
      <ProfilePicture
        :name="ask.name"
        :email="ask.email"
        :website="ask.website"
        small
      />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex gap-1">
          <span class="font-display text-lg"
            ><FilledButton
              v-if="ask.website"
              :url="ask.website"
              target="_blank"
              >{{ ask.name }}</FilledButton
            ><span
              class="rounded-xl px-2 py-1 text-primary bg-base-100 border-primary border-2 font-display"
              v-else
              >{{ ask.name }}</span
            >
            asked:</span
          >
        </div>
        <ContentRenderer :value="ask"></ContentRenderer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

const props = defineProps({
  ask: { type: Object as PropType<ParsedContent>, required: false },
});
</script>
