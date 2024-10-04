<template>
  <div class="w-full flex flex-col gap-4 bg-base-100 rounded-xl p-4">
    <div
      class="rounded-xl w-full flex gap-4 items-center p-4 bg-accent text-base-100 font-display text-lg border-2 border-accent"
      v-if="showSuccessDisclaimer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 min-w-6 min-h-6"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"
        />
      </svg>
      your comment was successfully sent! <br>
      all comments are manually reviewed, so it'll take a bit before it shows up!
    </div>
    <div
      class="rounded-xl w-full flex gap-4 items-center p-4 bg-accent text-base-100 font-display text-lg border-2 border-accent"
      v-if="showFailureDisclaimer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 min-w-6 min-h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
          clip-rule="evenodd"
        />
      </svg>
      something went wrong! try again later!
    </div>
    <form @submit.prevent="submitComment" class="flex flex-col gap-2">
      <div class="grid grid-cols-3 gap-x-2">
        <label class="font-display text-accent text-lg" for="name">name</label>
        <label class="font-display text-accent text-lg" for="email"
          >email</label
        >
        <label class="font-display text-accent text-lg" for="website"
          >website</label
        >
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
      <span class="text-sm italic text-center"
        >ur email is used to show ur
        <NuxtLink
          class="text-accent underline font-bold"
          to="https://gravatar.com/"
          >gravatar</NuxtLink
        >, if u have one</span
      >
      <div class="flex flex-col">
        <label for="comment" class="font-display text-accent text-lg"
          >comment (required)</label
        >
        <textarea
          v-model="comment.comment"
          placeholder="write a comment!"
          class="rounded-xl border-accent border-2 bg-base-100 p-2"
          rows="6"
          id="comment"
          required
        ></textarea>
      </div>
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
      showSuccessDisclaimer.value = true;
      showFailureDisclaimer.value = false;
    })
    .catch((_err) => {
      showSuccessDisclaimer.value = false;
      showFailureDisclaimer.value = true;
    });
}
</script>
