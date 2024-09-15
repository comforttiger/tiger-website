<template>
  <div class="flex flex-col gap-2" ref="scrollTarget">
    <TagList />
    <div v-if="tag" class="rounded-xl bg-base-100 p-5">
      <OutlineButton url="/" class="flex gap-2 w-fit"
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
        view all posts</OutlineButton
      >
      <h2 class="text-primary text-4xl font-display">
        posts tagged #{{ tag }}
      </h2>
    </div>
    <div v-else class="rounded-xl bg-base-100 p-5">
      <h2 class="text-primary text-4xl font-display">all posts</h2>
    </div>
    <div class="min-h-screen max-h-full">
      <transition name="fade" mode="out-in">
        <div v-if="queryReady" :key="tag" class="flex flex-col gap-5">
          <ContentList :query="query" v-slot="{ list }">
            <div class="flex flex-col gap-8">
              <div v-for="post in list" :key="post._path">
                <PostSummary :post="post" />
              </div>
            </div>
          </ContentList>
          <NavigationButtons />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
import NavigationButtons from "./NavigationButtons.vue";

// Get the current route and router instance
const route = useRoute();

// Safely get the tag from the query parameter
const tag = computed(() => {
  const tagValue = route.query.tag;

  // Ensure the tag is a valid string or undefined
  if (Array.isArray(tagValue)) {
    return tagValue[0] || undefined; // Take the first value if it's an array, or undefined if it's empty
  }

  return tagValue ?? undefined; // Use undefined if the tag is null/undefined
});

const page = computed(() => {
  const pageValue = route.query.page;

  // Ensure the tag is a valid string or undefined
  if (Array.isArray(pageValue)) {
    return pageValue[0] || undefined; // Take the first value if it's an array, or undefined if it's empty
  }

  return pageValue ?? "0";
});

const prevPage = page.value ? parseInt(page.value) > 0 : false;

const query = ref<QueryBuilderParams>({
  path: "/",
  sort: [{ timestamp: -1 }],
  where: [{ tags: { $exists: true } }],
  limit: 5,
});

const queryReady = ref(false);

function updateQuery() {
  queryReady.value = true;

  query.value = {
    path: "/",
    sort: [{ timestamp: -1 }],
    where: [
      { tags: { $exists: true } },
      ...(tag.value ? [{ tags: { $contains: tag.value } }] : []),
    ],
    skip: page.value ? 5 * parseInt(page.value) : 0,
    limit: 5,
  };

  setTimeout(() => {
    queryReady.value = true;
  }, 50);
}

watch(
  () => route.query.tag,
  () => {
    updateQuery();
  },
  { immediate: true }
);

watch(
  () => route.query.page,
  () => {
    updateQuery();
  },
  { immediate: true }
);

const scrollTarget = ref<null | HTMLElement>(null);

watch(
  () => [route.path, route.query.page, route.query.tag], // Watch path and query params
  () => {
    // Check if the current route is the home page
    if (route.path === "/") {
      // Scroll only when on the home page and query params change
      if (scrollTarget.value) {
        scrollTarget.value.scrollIntoView({
          behavior: "smooth",
          block: "start", // Aligns the element with the top of the viewport
        });
      }
    }
  },
  { immediate: true } // Run the scroll immediately on load if applicable
);
</script>

<style scoped>
/* Fade transition CSS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
