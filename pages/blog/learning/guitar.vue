<template>
  <div class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
     <BlogTitle category="learning" sub_category="guitar">
        guitar posting :3
     </BlogTitle>

      <AllPosts path="/blog/learning/guitar" />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'guitar',
  ogTitle: 'guitar',
  description: "tiger's posts about her journey learning how 2 play the guitar",
  ogDescription: "tiger's posts about her journey learning how 2 play the guitar",
})
</script>