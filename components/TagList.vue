<template>
    <div class="rounded-xl p-5 bg-base-100">
    <h2 class="text-primary text-4xl font-display">tags</h2>
      <ul class="flex gap-2">
        <li v-for="tag in blog_tags" :key="tag"><NuxtLink :to="`/tagged/${tag}`" class="underline text-secondary">#{{ tag }}</NuxtLink></li>
      </ul>
      <ul class="flex gap-2">
        <li v-for="tag in made_tags" :key="tag"><NuxtLink :to="`/tagged/${tag}`" class="underline text-secondary">#{{ tag }}</NuxtLink></li>
      </ul>
    </div>
  </template>

<script setup lang="ts">
import { blog_tags, made_tags } from '~/data/tags';

</script>