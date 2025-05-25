<template>
  <div class="flex items-center justify-center w-full">
    <div class="flex flex-col gap-4 items-center justify-center w-full">
      <div class="flex flex-col gap-2 items-center w-full">
        <NuxtLink :to="photos[selected]" external target="_blank">
          <figure class="flex flex-col gap-2 lg:h-[80vh] h-[60vh]">
          <img
            :src="photos[selected]"
            class="max-h-full max-w-full object-contain"
          />
          <div class="flex justify-center">
          <figcaption v-if="captions" class="italic text-balance text-center">{{ captions[selected] }}</figcaption>
          </div>
          </figure>
        </NuxtLink>

        <div class="flex justify-evenly w-full">
          <button
            @click="
              selected > 0 ? (selected -= 1) : (selected = photos.length - 1)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-10"
            >
              <path
                fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            @click="
              selected < photos.length - 1 ? (selected += 1) : (selected = 0)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-10"
            >
              <path
                fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex overflow-x-auto gap-2">
          <div v-for="(photo, index) in photos" class="min-w-fit">
            <button @click="selected = index" v-if="selected != index">
              <img :src="photo" class="lg:h-20 h-12" />
            </button>
            <button v-else disabled>
              <img :src="photo" class="lg:h-20 h-12 blur-[2px]" />
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  photos: { type: Array<string>, required: true },
  captions: { type: Array<string>, required: false },
  first: { type: Number, required: false },
});

var selected = ref<number>(props.first ? props.first : 0);
</script>
