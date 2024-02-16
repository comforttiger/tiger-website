<template>
  <div class="md:p-20 md:pb-40 pb-20">
    <div class="breadcrumbs text-accent" v-if="!home">
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
      </ul>
    </div>
    <h1 class="text-primary font-display text-7xl underline decoration-accent decoration-8">
      <slot />
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  home: { type: String, required: false }
})
</script>