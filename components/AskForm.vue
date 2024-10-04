<template>
  <div class="w-full flex flex-col gap-4 rounded-xl bg-base-100 p-4">
    <h2 class="text-primary text-4xl font-display text-center">send an ask!</h2>
    <form @submit.prevent="submitAsk" class="flex flex-col gap-2">
      <div class="grid grid-cols-3 gap-x-2">
        <label class="font-display text-accent text-lg" for="name">name: </label>
        <label class="font-display text-accent text-lg" for="email">email: </label>
        <label class="font-display text-accent text-lg" for="website">website: </label>
        <input
          v-model="ask.name"
          type="text"
          id="name"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        <input
          v-model="ask.email"
          type="email"
          id="email"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        <input
          v-model="ask.website"
          type="url"
          id="website"
          class="rounded-xl border-accent border-2 bg-base-100 p-2 w-full"
        />
        </div>
      <textarea
        v-model="ask.ask"
        placeholder="ask something!"
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
        send ask!
      </button>
    </form>
    <div
      class="rounded-xl w-fit p-4 bg-base-100 text-accent font-display text-lg"
      v-if="showSuccessDisclaimer"
    >
      the ask has been sent!
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

const ask = ref({
  name: "",
  email: "",
  website: "",
  ask: "",
});

const showSuccessDisclaimer = ref(false);
const showFailureDisclaimer = ref(false);

function submitAsk() {
  const formData = new URLSearchParams();
  const name = ask.value.name || "anonymous user";

  formData.append("fields[name]", name);
  formData.append("fields[email]", ask.value.email);
  formData.append("fields[website]", ask.value.website);
  formData.append("fields[ask]", ask.value.ask);

  axios
    .post(
      "https://comments.kittycat.homes/v2/entry/comforttiger/tiger-website/main/asks",
      formData
    )
    .then((_response) => {
      ask.value.website = "";
      ask.value.email = "";
      ask.value.name = "";
      ask.value.ask = "";
      showSuccessDisclaimer.value = true;
      showFailureDisclaimer.value = false;
    })
    .catch((_err) => {
      showSuccessDisclaimer.value = false;
      showFailureDisclaimer.value = true;
    });
}
</script>
