<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
     <BlogTitle category="blorbo">
        my blorbos :3
      </BlogTitle>

      <AllPosts path="/blog/blorbo" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'blorbos',
  ogTitle: 'blorbos',
  description: 'posts about my blorbos!',
  ogDescription: 'posts about my blorbos!',
})
</script>