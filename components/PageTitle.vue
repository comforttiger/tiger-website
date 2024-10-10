<template>
  <div class="md:p-20 md:pb-40 pb-20">
    <div class="flex md:flex-row flex-col items-center md:h-48 w-full gap-4 md:gap-8">
      <img src="/favicon.png" class="md:h-full md:w-fit h-fit w-1/2 rounded-xl" style="image-rendering: pixelated" />
      <h1
        class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 md:h-full w-full flex items-center"
      >
        <span><slot /></span>
      </h1>
    </div>
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
