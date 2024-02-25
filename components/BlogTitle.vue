<template>
  <div class="md:p-20">
    <div class="breadcrumbs text-accent bg-base-100 rounded-xl p-2 mb-2 w-fit">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/blog">blog</NuxtLink></li>
        <li v-if="page == 'diary'" ><NuxtLink to="/blog/diary">diary</NuxtLink></li>
        <li v-if="page == 'programming'"><NuxtLink to="/blog/programming">programming</NuxtLink></li>
        <li v-if="page == 'blorbo'"><NuxtLink to="/blog/blorbo">blorbo</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8 bg-base-100 rounded-xl p-5 w-fit">
      <slot />
    </h1>
    <div class="flex gap-2 bg-base-100 rounded-xl p-2 mt-2 w-fit" v-if="page == 'blog'">
      <NuxtLink to="/blog/diary" class="underline text-secondary">diary</NuxtLink>
      <NuxtLink to="/blog/programming" class="underline text-secondary"
        >programming</NuxtLink
      >
      <NuxtLink to="/blog/blorbo" class="underline text-secondary">blorbo</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: { type: String, required: true },
})
</script>