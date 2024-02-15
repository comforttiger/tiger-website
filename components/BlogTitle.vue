<template>
  <div class="p-20 pb-40">
    <h1 class="text-primary text-7xl underline decoration-accent decoration-8">
      <slot />
    </h1>
    <div class="flex gap-2">
      <NuxtLink to="/blog" class="underline text-secondary" v-if="page != 'blog'">all</NuxtLink>
      <NuxtLink to="/blog/diary" class="underline text-secondary" v-if="page != 'diary'">diary</NuxtLink>
      <NuxtLink to="/blog/programming" class="underline text-secondary" v-if="page != 'programming'"
        >programming</NuxtLink
      >
      <NuxtLink to="/blog/blorbo" class="underline text-secondary" v-if="page != 'blorbo'">blorbo</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: { type: String, required: true },
})
</script>