<template>
  <div class="flex">
    <div class="flex justify-start w-full">
      <FilledButton
        v-if="hasPrevPage"
        :url="`${prevPageLink}${tagLink}`"
        class="text-lg"
        >previous</FilledButton
      >
    </div>
    <div class="flex justify-end w-full">
      <FilledButton
        v-if="hasNextPage"
        :url="`${nextPageLink}${tagLink}`"
        class="text-lg"
        >next</FilledButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const route = useRoute();

const page = computed(() => {
  const pageValue = route.query.page;

  if (Array.isArray(pageValue)) {
    return pageValue[0] ? parseInt(pageValue[0]) : 0;
  }
  return parseInt(pageValue as string) || 0;
});

const nextPageLink = computed(() => `/?page=${page.value + 1}`);
const prevPageLink = computed(() => `/?page=${page.value - 1}`);

const hasPrevPage = computed(() => page.value > 0);

const queryLength = ref(0);

watchEffect(async () => {
  let tagValue = route.query.tag;
  let tag = "";

  if (Array.isArray(tagValue)) {
    tag = tagValue[0] || "";
  } else if (tagValue) {
    tag = tagValue as string;
  }

  queryLength.value = await queryContent("/")
    .where({ tags: { $exists: true } })
    .where(tag ? { tags: { $contains: tag } } : {})
    .count();
});

const hasNextPage = computed(() => {
  return (page.value + 1) * 10 < queryLength.value; // Assuming 5 items per page
});

const tagLink = computed(() => {
  const tagValue = route.query.tag;

  if (Array.isArray(tagValue)) {
    return tagValue[0] || undefined;
  }

  return tagValue ? `&tag=${tagValue}` : "";
});
</script>
