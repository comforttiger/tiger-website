<template>
  <div class="w-full flex flex-col gap-4 bg-base-100 rounded-xl p-4">
    <form
      @submit.prevent="submitComment"
      class="flex flex-col gap-2"
    >
    <div class="grid grid-cols-3 gap-x-2">
        <label class="font-display text-accent text-lg" for="name">name (optional)</label>
        <label class="font-display text-accent text-lg" for="email">email (optional)</label>
        <label class="font-display text-accent text-lg" for="website">website (optional)</label>
        <input
          v-model="comment.name"
          type="text"
          id="name"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        <input
          v-model="comment.email"
          type="email"
          id="email"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        <input
          v-model="comment.website"
          type="url"
          id="website"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        </div>
      <textarea
        v-model="comment.comment"
        placeholder="write a comment!"
        class="rounded-xl border-accent border-2 bg-base-100 p-2"
        rows="6"
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
        comment!
      </button>
    </form>
    <span class="text-sm italic">ur email is used to show ur <NuxtLink class="text-accent underline font-bold" to="https://gravatar.com/">gravatar</NuxtLink>, if u have one</span>
    <div
      class="rounded-xl w-fit p-4 bg-base-100 text-accent font-display text-lg"
      v-if="showSuccessDisclaimer"
    >
      your comment was successfully sent! all comments are manually reviewed, so it'll take a bit before it shows up!
    </div>
    <div
      class="rounded-xl w-fit p-4 bg-base-100 text-accent font-display border-2 border-accent text-lg"
      v-if="showFailureDisclaimer"
    >
      something went wrong! try again later!
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const props = defineProps({
  slug: { type: String, required: true },
});

const comment = ref({
  name: "",
  email: "",
  website: "",
  comment: "",
  subscribe: false,
});

const showSuccessDisclaimer = ref(false);
const showFailureDisclaimer = ref(false);

function submitComment() {
  const formData = new URLSearchParams();
  const name = comment.value.name || "anonymous user";

  formData.append("options[slug]", props.slug);
  formData.append("fields[name]", name);
  formData.append("fields[email]", comment.value.email);
  formData.append("fields[website]", comment.value.website);
  formData.append("fields[comment]", comment.value.comment);

  axios
    .post(
      "https://comments.kittycat.homes/v2/entry/comforttiger/tiger-website/main/comments",
      formData
    )
    .then((response) => {
      console.log("Comment submitted successfully:", response);
      comment.value.website = "";
      comment.value.name = "";
      comment.value.email = "";
      comment.value.comment = "";
      showSuccessDisclaimer.value = true
      showFailureDisclaimer.value = false
    })
    .catch((_err) => {
      showSuccessDisclaimer.value = false
      showFailureDisclaimer.value = true
    });
}
</script>
