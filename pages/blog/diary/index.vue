<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
     <BlogTitle category="diary" index>
        diary :3
     </BlogTitle>

      <AllPosts path="/blog/diary" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "tiger's diary!",
  ogTitle: "tiger's diary!",
  description: 'dont worry, youre allowed to read it. its not a *secret* diary.',
  ogDescription: 'dont worry, youre allowed to read it. its not a *secret* diary.',
})
</script>