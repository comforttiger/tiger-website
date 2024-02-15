<template>
  <div class="md:p-20 md:pb-40 pb-20">
    <div class="breadcrumbs text-accent">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/made">made</NuxtLink></li>
        <li v-if="page == 'art'"><NuxtLink to="/made/art">art</NuxtLink></li>
        <li v-if="page == 'games'"><NuxtLink to="/made/games">games</NuxtLink></li>
        <li v-if="page == 'photography'"><NuxtLink to="/made/art">photography</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary text-7xl underline decoration-accent decoration-8">
      <slot />
    </h1>
    <div class="flex gap-2" v-if="page == 'index'">
      <NuxtLink to="/made/art" class="underline text-secondary">art</NuxtLink>
      <NuxtLink to="/made/games" class="underline text-secondary"
        >games</NuxtLink
      >
      <NuxtLink to="/made/photography" class="underline text-secondary">photography</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: { type: String, required: true },
})
</script>