<template>
  <div class="rounded-xl bg-base-100 p-4 md:w-1/2 w-screen flex flex-col gap-2">
    <div class="flex gap-2">
      <FilledButton
        v-if="comment.website"
        :url="comment.website"
        target="_blank"
        >{{ comment.name }}</FilledButton
      >
      <span
        v-else
        class="border-accent border-2 px-2 py-1 text-accent bg-base-100 rounded-xl font-display w-fit"
        >{{ comment.name }}</span
      >
      <DateComponent
        :timestamp="comment.timestamp"
        class="border-accent border-2 px-2 py-1 text-accent bg-base-100 rounded-xl font-display w-fit"
      />
    </div>
    <ContentRenderer :value="comment" class="space-y-2"></ContentRenderer>
    <FilledButton
      v-if="!showReplyForm"
      @click="toggleReplyForm"
      class="w-fit hover:cursor-pointer flex gap-2 text-lg"
      ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
            clip-rule="evenodd"
          />
        </svg>
        reply</FilledButton
    >
    <form
      v-if="showReplyForm"
      @submit.prevent="submitReply"
      class="flex flex-col gap-2 w-2/3"
    >
      <input
        v-model="replyComment.name"
        type="text"
        placeholder="name (optional)"
        class="rounded-xl border-accent border-2 bg-base-100 p-2"
      />
      <input
        v-model="replyComment.website"
        type="text"
        placeholder="website link (optional)"
        class="rounded-xl border-accent border-2 bg-base-100 p-2"
      />
      <textarea
        v-model="replyComment.comment"
        placeholder="reply"
        class="rounded-xl border-accent border-2 bg-base-100 p-2"
        rows="3"
        required
      ></textarea>
      <button
        type="submit"
        class="rounded-xl px-2 py-1 text-base-100 bg-accent font-display hover:brightness-90 text-lg flex gap-2 items-center w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
            clip-rule="evenodd"
          />
        </svg>
        reply
      </button>
    </form>
  </div>
  <div v-if="replies.length" class="flex flex-col gap-2 ml-8">
    <Comment :path="path" :comment="reply" v-for="reply in replies" />
  </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
import axios from "axios";

const props = defineProps({
  comment: { type: Object as PropType<ParsedContent>, required: true },
  path: { type: String, required: true },
});

// State for the reply form
const showReplyForm = ref(false);

// State for the reply comment
const replyComment = ref({
  name: "",
  website: "",
  comment: "",
});

// Toggle the visibility of the reply form
function toggleReplyForm() {
  showReplyForm.value = !showReplyForm.value;
}

// Submit the reply comment
async function submitReply() {
  const formData = new URLSearchParams();
  const name = replyComment.value.name || "anonymous user";

  formData.append("options[slug]", props.path.slice(1)); // Assuming slug is defined elsewhere
  formData.append("fields[name]", name);
  formData.append("fields[website]", replyComment.value.website);
  formData.append("fields[comment]", replyComment.value.comment);
  formData.append("fields[reply]", props.comment._id); // Add the parent comment's ID

  try {
    const response = await axios.post(
      "https://comments.kittycat.homes/v2/entry/comforttiger/tiger-website/main/comments",
      formData
    );
    console.log("Reply submitted successfully:", response);

    // Optionally reset the reply comment state after submission
    replyComment.value.name = "";
    replyComment.value.website = "";
    replyComment.value.comment = "";
    showReplyForm.value = false; // Hide the reply form after submission
  } catch (err) {
    console.error("Error submitting reply:", err);
  }
}

// Load replies for the comment
const replies = await queryContent(`comments${props.path}`)
  .where({ reply: props.comment._id })
  .sort({ timestamp: 1 })
  .find();
</script>
