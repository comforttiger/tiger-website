<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/likes">likes</NuxtLink></li>
        <li v-if="page == 'funny-videos'"><NuxtLink to="/likes/funny-videos">funny-videos</NuxtLink></li>
        <li v-if="page == 'good-music'"><NuxtLink to="/likes/good-music">good-music</NuxtLink></li>
        <li v-if="page == 'girlfriend'"><NuxtLink to="/likes/girlfriend">girlfriend</NuxtLink></li>
        <li v-if="page == 'other-stuff'"><NuxtLink to="/likes/other-stuff">other-stuff</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 pb-1">
      <slot />
    </h1>
    <div class="flex gap-2" v-if="page =='index'">
      <NuxtLink to="/likes/funny-videos" class="underline text-secondary">funny videos</NuxtLink>
      <NuxtLink to="/likes/good-music" class="underline text-secondary"
        >good music</NuxtLink
      >
      <NuxtLink to="/likes/girlfriend" class="underline text-secondary">girlfriend</NuxtLink>
      <NuxtLink to="/likes/other-stuff" class="underline text-secondary">other stuff</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: { type: String, required: true },
})
</script>