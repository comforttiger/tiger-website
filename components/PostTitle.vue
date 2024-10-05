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
    <div class="flex gap-2 flex-wrap">
      <DateComponent v-if="!draft"
        :timestamp="timestamp"
        class="border-accent border-2 px-2 py-1 text-accent bg-base-100 rounded-xl font-display h-fit"
      />
      <Tag v-for="tag in tags" :tag="tag" />
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
