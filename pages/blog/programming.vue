<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
      <BlogTitle category="programming">
        programming :3
        </BlogTitle>
      

      <AllPosts path="/blog/programming" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'programming',
  ogTitle: 'programming',
  description: 'posts about programming!',
  ogDescription: 'posts about programming!',
})
</script>