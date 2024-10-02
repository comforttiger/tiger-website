<template>
  <article class="w-full flex items-center justify-center flex-col gap-2">
    <div class="min-h-screen md:w-2/3 w-screen flex flex-col gap-2">
      <div>
        <PostTitle :timestamp="post.timestamp" :tags="post.tags" :draft="post.tags.includes('draft')">{{ post.title }}</PostTitle>
        <div class="flex flex-col gap-5">
          <div
            v-if="post.photos"
            class="columns-lg gap-2 rounded-xl bg-base-100 p-5"
          >
            <div class="flex flex-col gap-2">
              <img v-for="photo in post.photos" :src="photo" />
            </div>
          </div>
          <img
            v-if="post.image && post.tags.includes('art')"
            :src="post.image"
            :alt="post.image_description"
            class="h-fit w-fit p-5 bg-base-100 rounded-xl"
          />
          <img
            v-else-if="post.image"
            :src="post.image"
            :alt="post.image_description"
            class="md:w-1/2 w-full p-5 bg-base-100 rounded-xl"
          />
          <iframe
            v-if="post.video"
            :src="post.video"
            class="md:w-1/2 w-full aspect-video p-5 bg-base-100 rounded-xl"
          ></iframe>
          <div v-if="post.body && post.body.children.length > 0" class="text-neutral p-5 bg-base-100 rounded-xl">
            <ContentRenderer :value="post" class="space-y-3" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/3 flex justify-start">
        <CommentButton v-if="post.title" :title="post.title" />
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
});
</script>
