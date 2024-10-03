<template>
  <article class="w-full flex items-center justify-center flex-col gap-2">
    <div class="min-h-screen md:w-2/3 w-screen flex flex-col gap-12">
      <div>
        <PostTitle
          :timestamp="post.timestamp"
          :tags="post.tags"
          :draft="post.tags.includes('draft')"
          >{{ post.title }}</PostTitle
        >
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
          <div
            v-if="post.body && post.body.children.length > 0"
            class="text-neutral p-5 bg-base-100 rounded-xl"
          >
            <ContentRenderer :value="post" class="space-y-3" />
          </div>
        </div>
      </div>
      <!-- <div class="w-full md:w-2/3 flex justify-start">
        <CommentButton v-if="post.title" :title="post.title" />
      </div> -->
      <CommentForm :slug="useRoute().path.slice(1)" />
      <div v-if="comments.length" class="flex flex-col gap-2">
        <Comment :path="useRoute().path" :comment="comment" v-for="comment in comments" />
      </div>
      <div
        v-else
        class="rounded-xl p-5 border-accent border-2 text-accent bg-base-100 w-fit font-display text-lg flex gap-2 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clip-rule="evenodd"
          />
        </svg>
        there's no comments! yet...
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const post = await queryContent(useRoute().path).findOne();

const comments = await queryContent(`/comments${useRoute().path}`)
  .sort({ timestamp: 1 })
  .where({ reply: { $exists: false }})
  .find();

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
