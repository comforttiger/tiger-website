<template>
  <div class="w-full flex items-center justify-center">
    <div class="min-h-screen flex flex-col gap-16 max-w-3xl items-center">
      <div class="bg-base-100 p-4 rounded-xl">
        hi! thank you for visiting my website. write something nice in my
        guestbook!
      </div>
      <CommentForm slug="guestbook" guestbook class="w-full" />
      <div class="flex flex-col gap-4 w-full">
        <div
          v-if="comments.length"
          class="flex flex-col gap-2 md:w-full w-screen"
        >
          <Comment
            :path="useRoute().path"
            :comment="comment"
            guestbook
            v-for="comment in comments"
          />
        </div>
        <div
          v-else
          class="rounded-xl p-5 text-accent bg-base-100 w-fit font-display text-lg flex gap-2 items-center"
        >
          there are no comments! yet...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const comments = await queryContent("/comments/guestbook")
  .sort({ timestamp: -1 })
  .where({ reply: { $exists: false } })
  .find();

useSeoMeta({
  title: "lotte's guestbook :3",
  ogTitle: "lotte's guestbook :3",
});
</script>
