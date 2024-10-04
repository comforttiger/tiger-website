<template>
  <article class="w-full flex items-center justify-center flex-col gap-2">
    <div class="min-h-screen max-w-3xl flex flex-col gap-12">
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
            class="max-w-full w-fit p-5 bg-base-100 rounded-xl"
          />
          <iframe
            v-if="post.video"
            :src="post.video"
            class="max-w-full w-fit aspect-video p-5 bg-base-100 rounded-xl"
          ></iframe>
          <Ask v-if="post.ask" :ask="post.ask" />
          <div
            v-if="post.body && post.body.children.length > 0"
            class="text-neutral p-5 bg-base-100 rounded-xl"
          >
            <ContentRenderer :value="post" class="space-y-3" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div
          v-if="comments.length"
          class="flex flex-col gap-2 md:w-full w-screen"
        >
          <Comment
            :path="useRoute().path"
            :comment="comment"
            v-for="comment in comments"
          />
        </div>
        <div
          v-else
          class="rounded-xl p-5 text-accent bg-base-100 w-fit font-display text-lg flex gap-2 items-center"
        >
          there are no comments! yet...
        </div>
        <CommentForm :slug="useRoute().path.slice(1)" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const post = await queryContent(useRoute().path).findOne();

const comments = await queryContent(`/comments${useRoute().path}`)
  .sort({ timestamp: 1 })
  .where({ reply: { $exists: false } })
  .find();

const ask = post.ask ? await queryContent(`/asks/${post.ask}`).findOne() : undefined;

let description = "";
description = ask ? `${ask.name} asked: ${ask.description}` : post.description

useSeoMeta({
  title: post.title,
  ogTitle: post.title,
  description: description,
  ogDescription: description,
  ogImage: post.image,
});
</script>
