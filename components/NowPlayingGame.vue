<template>
    <client-only>
      <div v-if="show && game && game.name">
        <NuxtLink
          :to="game.link"
          target="_blank"
          class="rounded-xl text-accent bg-base-100 p-5 flex flex-col gap-5"
        >
          <h3 class="text-4xl text-primary font-display flex gap-2 items-center justify-center">
            currently playing
          </h3>
          <div>
            <div
              v-if="
                game.header_image"
              class="flex items-center"
            >
              <img
                :src="game.header_image"
                :alt="`Game artwork for ${game.name}`"
              />
            </div>
            <div
              class="flex flex-col gap-5 col-span-2 justify-evenly font-display"
            >
              <div>
                <p class="text-4xl font">{{ game.name }}</p>
                <p class="text-2xl">{{ game.developer[0] }}</p>
              </div>
              <p class="text-neutral-50 font-sans">{{ game.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </client-only>
  </template>
  
  <script setup lang="ts">
  import { useFetch } from "#app";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const show = ref(false);
  
  const { data: game, refresh } = await useFetch<{
    name: string;
    description: string;
    developer: Array<string>;
    header_image: string;
    link: string;
  }>("http://nowplaying.kittycat.homes/tiger/game");
  
  async function get_game() {
    await refresh();
    show.value = true;
  }
  
  onMounted(() => {
    setTimeout(get_game, 50);
  
    // const intervalId = setInterval(get_song, 30000);
  
    // onBeforeUnmount(() => {
    //   clearInterval(intervalId);
    // });
  });
  </script>
  