<template>
    <article class="w-full flex items-center justify-center flex-col">
      <div class="md:w-2/3 w-screen">
        <div class="p-5 pl-0">
          <LikesTitle page="girlfriend">{{ post.title }}</LikesTitle>
        </div>
        <div class="text-neutral">
          <ContentRenderer :value="post" class="space-y-2" />
        </div>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  const post = await queryContent("/likes/girlfriend").findOne();
</script>