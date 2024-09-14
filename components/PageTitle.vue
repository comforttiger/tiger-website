<template>
  <div class="md:p-20 md:pb-40 pb-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 w-min underline" v-if="!home">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
      </ul>
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
