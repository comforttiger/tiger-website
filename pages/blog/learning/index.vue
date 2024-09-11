<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
     <BlogTitle category="learning" index>
        learning
     </BlogTitle>

      <AllPosts path="/blog/learning" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "posts abt learning stuff",
  ogTitle: "posts abt learning stuff",
  description: 'blogging abt learning',
  ogDescription: 'bogging abt learning',
})
</script>