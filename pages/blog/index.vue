<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
      <BlogTitle category="blog" index>bogposing :3</BlogTitle>
      <AllPosts path="/blog" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "tiger's blog",
  ogTitle: "tiger's blog",
  description: 'tiger is an awesome kitty',
  ogDescription: 'tiger is an awesome kitty',
})
</script>