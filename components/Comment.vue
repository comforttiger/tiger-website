<template>
  <div class="rounded-xl bg-base-100 p-4 flex flex-col gap-6">
    <div class="flex gap-4">
      <NuxtLink
        v-if="comment.website"
        :to="comment.website"
        class="min-h-16 min-w-16"
        ><img
          :src="`https://gravatar.com/avatar/${comment.email}?s=64&d=https%3A%2F%2Ftiger.kittycat.homes%2Fimages%2Fanon.webp&r=pg`"
          class="rounded-xl h-16 w-16"
      /></NuxtLink>
      <img
        v-else
        :src="`https://gravatar.com/avatar/${comment.email}?s=64&d=https%3A%2F%2Ftiger.kittycat.homes%2Fimages%2Fanon.webp&r=pg`"
        class="rounded-xl h-16 w-16"
      />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex md:flex-row flex-col gap-1">
          <FilledButton
            v-if="comment.website"
            :url="comment.website"
            target="_blank"
            class="w-fit"
            >{{ comment.name }}</FilledButton
          >
          <span
            v-else
            class="border-accent border-2 px-2 py-1 text-accent bg-base-100 rounded-xl font-display w-fit"
            >{{ comment.name }}</span
          >
          <DateComponent
            :timestamp="comment.timestamp"
            time
            class="px-2 py-1 text-accent bg-base-100 rounded-xl font-display italic w-fit"
          />
        </div>
        <ContentRenderer :value="comment" class="space-y-2"></ContentRenderer>
        <CommentForm comment-name="reply" :slug="path.slice(1)" :reply="comment._id" class="p-0" />
      </div>
    </div>
    <div
      v-if="replies.length"
      class="flex flex-col gap-2 border-l-4 border-accent md:ml-4"
    >
      <Comment
        :path="path"
        :comment="reply"
        v-for="reply in replies"
        class="w-full p-0 pl-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

const props = defineProps({
  comment: { type: Object as PropType<ParsedContent>, required: true },
  path: { type: String, required: true },
});


const replies = await queryContent(`comments${props.path}`)
  .where({ reply: props.comment._id })
  .sort({ timestamp: 1 })
  .find();
</script>
