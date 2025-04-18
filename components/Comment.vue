<template>
  <div
    class="rounded-xl bg-base-100 p-4 flex flex-col gap-6"
    :id="comment.timestamp"
  >
    <div class="flex gap-4">
      <ProfilePicture
        :name="comment.name"
        :email="comment.email"
        :website="comment.website"
      />
      <div class="flex flex-col gap-4 w-full px-0">
        <div class="flex md:flex-row md:justify-between flex-col gap-1 w-full px-0">
          <FilledButton
            v-if="comment.website"
            :url="comment.website"
            target="_blank"
            class="w-fit !bg-accent !border-accent"
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
        <CommentForm
          comment-name="reply"
          :slug="path.slice(1)"
          :reply="comment._id"
          :guestbook="guestbook"
          class="!p-0"
        />
      </div>
    </div>
    <div
      v-if="replies.length"
      class="flex flex-col gap-2 border-l-4 border-accent md:ml-4"
    >
      <Comment
        :path="path"
        :comment="reply"
        :guestbook="guestbook"
        v-for="reply in replies"
        class="w-full pr-0 pl-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

// Props passed to the component
const props = defineProps({
  comment: { type: Object as PropType<ParsedContent>, required: true },
  path: { type: String, required: true },
  guestbook: { type: Boolean, required: false}
});

const replies = ref<ParsedContent[]>([]);

const initialReplies = await queryContent(`comments${props.path}`)
  .where({ reply: props.comment._id })
  .where({ pending: { $exists: false } })
  .sort({ timestamp: 1 })
  .find();

replies.value = initialReplies;

const checkHashForPendingComment = async () => {
  const hash = useRoute().hash;
  if (hash.length) {
    const timestamp = Number(hash.slice(1));

    // Only continue if the timestamp is a valid number
    if (!isNaN(timestamp)) {
      const pendingComment = await queryContent("/comments")
        .where({ pending: { $exists: true } })
        .where({ reply: props.comment._id })
        .where({ timestamp })
        .find();

      if (
        pendingComment.length &&
        !replies.value.find(
          (reply: ParsedContent) => reply._id === pendingComment[0]._id
        )
      ) {
        replies.value.push(pendingComment[0]);
      }
    }
  }
};

onMounted(async () => {
  await checkHashForPendingComment();
});
</script>
