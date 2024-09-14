<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent underline bg-base-100 rounded-xl p-2 mb-2 w-fit">
      <NuxtLink to="/" class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>
 home</NuxtLink>
    </div>
    <h1
      class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit"
    >
      <slot />
    </h1>
    <div class="mt-2 flex gap-2">
    <DateComponent :date="date" class="italic text-accent bg-base-100 rounded-xl p-2" />
      <ul class="p-2 flex gap-2">
        <li v-for="tag in tags"><Tag :tag="tag" /></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  date: { type: String, required: true },
  tags: { type: [String], required: false }
});
</script>
