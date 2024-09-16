<template>
  <div class="md:p-20 md:pb-40 pb-20">
    <div class="breadcrumbs text-accent w-fit" v-if="!home">
      <OutlineButton url="/" class="flex gap-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        home</OutlineButton
      >
    </div>
    <h1
      class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5"
    >
      <span><slot /></span>
    </h1>
    <div v-if="timestamp" class="bg-base-100 rounded-xl p-2">
      <DateComponent :timestamp="timestamp" class="italic text-accent" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  home: { type: String, required: false },
  timestamp: { type: Number, required: false },
});
</script>
