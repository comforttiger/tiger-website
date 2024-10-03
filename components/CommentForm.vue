<template>
  <form @submit.prevent="submitComment" class="flex flex-col gap-2 w-1/2">
    <input
      v-model="comment.name"
      type="text"
      placeholder="name"
      id="name"
      class="rounded-xl border-accent border-2 bg-base-100 p-2"
      required
    />
    <textarea
      v-model="comment.comment"
      placeholder="comment"
      class="rounded-xl border-accent border-2 bg-base-100 p-2"
      required
    ></textarea>
    <div class="flex gap-2 items-center">
      <button
        type="submit"
        class="rounded-xl px-2 py-1 text-base-100 bg-accent font-display hover:brightness-90 text-lg flex gap-2 items-center"
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
        comment!
      </button>
      or <CommentButton :title="slug" />
    </div>
  </form>
</template>

<script setup lang="ts">
import axios from "axios";

const props = defineProps({
    slug: { type: String, required: true }
})

const comment = ref({
  name: "",
  website: "",
  comment: "",
});

function submitComment() {
  const formData = new URLSearchParams();

  formData.append("options[slug]", props.slug);

  formData.append("fields[name]", comment.value.name);
  formData.append("fields[message]", comment.value.comment);

  axios
    .post(
      "https://comments.kittycat.homes/v2/entry/comforttiger/tiger-website/main/comments",
      formData
    )
    .then((response) => {
      console.log("Comment submitted successfully:", response);
      // Optionally reset the comment state after submission
      comment.value.name = "";
      comment.value.comment = "";
    })
    .catch((err) => {
      console.error("Error submitting comment:", err);
    });
}
</script>
