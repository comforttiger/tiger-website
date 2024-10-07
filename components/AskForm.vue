<template>
  <div class="w-full flex flex-col gap-4 rounded-xl bg-base-100 p-4">
    <h2 class="text-primary text-4xl font-display text-center">send an ask!</h2>
    <div
      class="rounded-xl w-full flex gap-2 items-center justify-center p-4 bg-accent text-base-100 font-display text-lg border-2 border-accent"
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
      the ask has been sent!
    </div>
    <div
      class="rounded-xl w-full flex gap-2 items-center justify-center p-4 bg-accent text-base-100 font-display text-lg border-2 border-accent"
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
    <div class="w-full flex flex-col gap-4 items-center">
      <AskPreview :name="ask.name" :email="ask.email" :website="ask.website">{{
        ask.ask
      }}</AskPreview>
      <form @submit.prevent="submitAsk" class="flex flex-col gap-2">
        <div class="flex flex-col w-full">
          <label class="font-display text-primary text-lg" for="name"
            >name</label
          >
          <input
            v-model="ask.name"
            type="text"
            id="name"
            class="rounded-xl border-primary border-2 bg-base-100 p-2 w-full input input-primary"
          />
          <label for="name" class="text-sm italic"
            >optional (leave blank to be "anonymous user")</label
          >
        </div>
        <div class="flex gap-2">
          <div class="flex flex-col w-full">
            <label class="font-display text-primary text-lg" for="website"
              >website</label
            >
            <input
              v-model="ask.website"
              type="url"
              id="website"
              class="rounded-xl border-primary border-2 bg-base-100 p-2 w-full input input-primary"
            />
            <label for="website" class="text-sm italic">optional</label>
          </div>
          <div class="flex flex-col w-full">
            <label class="font-display text-primary text-lg" for="email"
              >email</label
            >
            <input
              v-model="ask.email"
              type="email"
              id="email"
              class="rounded-xl border-primary border-2 bg-base-100 p-2 w-full input input-primary"
            />
            <label for="email" class="text-sm italic"
              >optional (used to show ur
              <NuxtLink
                class="text-secondary underline font-bold"
                to="https://www.libravatar.org/"
                >libravatar</NuxtLink
              >
              or
              <NuxtLink
                class="text-secondary underline font-bold"
                to="https://gravatar.com/"
                >gravatar</NuxtLink
              >)
            </label>
          </div>
        </div>
        <div class="flex flex-col">
          <label class="font-display text-primary text-lg" for="ask">ask</label>
          <textarea
            v-model="ask.ask"
            :placeholder="`go ahead, write an ask`"
            class="rounded-xl border-primary border-2 bg-base-100 p-2 textarea textarea-primary"
            rows="3"
            id="ask"
            required
          ></textarea>
          <label for="ask" class="text-sm italic"
            >required (supports markdown and css crimes)</label
          >
        </div>
        <div class="flex gap-2">
          <button
            type="submit"
            class="rounded-xl px-2 py-1 text-base-100 bg-primary font-display hover:brightness-90 text-lg flex gap-2 items-center w-fit"
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
        </div>
      </form>
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
