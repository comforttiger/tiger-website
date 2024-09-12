<template>
  <article class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen min-h-screen">
      <MadePostTitle :date="post.date" :category="post.category" :sub_category="post.sub_category">{{
        post.title
      }}</MadePostTitle>
      <div class="text-neutral p-5 bg-base-100 rounded-xl">
        <ContentRenderer :value="post" class="space-y-2" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const post = await queryContent(useRoute().path).findOne();

// useHead({
//   title: post.title,
//   meta: [{ name: "description", content: post.description }],
// });
useSeoMeta({
  title: post.title,
  ogTitle: post.title,
  description: post.description,
  ogDescription: post.description,
  ogImage: post.image,
})

</script>