<template>
  <div class="md:p-20 flex flex-col gap-2">
    <div class="breadcrumbs p-2 w-fit">
      <OutlineButton url="/" class="flex gap-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        home</OutlineButton
      >
    </div>
    <h1
      class="text-primary font-display text-5xl underline decoration-accent decoration-4 bg-base-100 rounded-xl p-5 w-fit"
    >
      <slot />
    </h1>
    <Draft v-if="draft" />
    <div class="flex gap-2 flex-wrap h-fit">
      <DateComponent
        v-if="!draft"
        :timestamp="timestamp"
        class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display h-fit"
      />
      <div v-for="tag in tags" class="flex">
        <div
          v-if="tag == 'draft'"
          class="py-1 px-2 flex gap-2 border-2 border-primary bg-base-100 text-primary rounded-xl font-display"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
            />
            <path
              d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
            />
          </svg>
          {{ tag }}
        </div>
        <OutlineButton :to="{ path: '/', query: { tag: tag } }" v-else
          >#{{ tag }}</OutlineButton
        >
      </div>
      <!-- <Tag v-for="tag in tags" :tag="tag" class="hover:bg-base-100 hover:text-accent" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  timestamp: { type: Number, required: true },
  tags: { type: Array<string>, required: false },
  draft: { type: Boolean, required: false },
});
</script>
