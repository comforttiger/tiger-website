<template>
    <article class="w-full flex items-center justify-center flex-col">
      <div class="md:w-2/3 w-screen h-screen">
        <div class="p-5 pl-0">
          <LikesTitle page="girlfriend">{{ post.title }}</LikesTitle>
        </div>
        <div class="text-neutral bg-base-100 rounded-xl p-5">
          <ContentRenderer :value="post" class="space-y-2" />
        </div>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  const post = await queryContent("/likes/girlfriend").findOne();
  useSeoMeta({
  title: post.title,
  ogTitle: post.title,
  description: post.description,
  ogDescription: post.description,
})
</script>