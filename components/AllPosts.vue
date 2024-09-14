<template>
  <div class="flex flex-col gap-2">
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
      <div v-if="queryReady" :key="tag">
        <ContentList :query="query" v-slot="{ list }">
          <div class="flex flex-col gap-8">
            <div v-for="post in list" :key="post._path">
              <PostSummary :post="post" />
            </div>
          </div>
        </ContentList>
      </div>
    </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';

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

// A ref to hold the dynamic query object
const query = ref<QueryBuilderParams>({
  path: "/",
  sort: [{ timestamp: -1 }],
  where: [{ tags: { $exists: true } }],
});

// A reactive variable to control query readiness
const queryReady = ref(false);

// Function to update the query dynamically when the tag changes
function updateQuery() {
  queryReady.value = true; // Set query as not ready to trigger transition

  // Rebuild query with tag filtering if available
  query.value = {
    path: "/",
    sort: [{ timestamp: -1 }],
    where: [
      { tags: { $exists: true } },
      ...(tag.value ? [{ tags: { $contains: tag.value } }] : []),
    ],
  };

  // Delay query ready to simulate transition and re-render
  setTimeout(() => {
    queryReady.value = true;
  }, 50); // Slight delay to ensure the transition triggers
}

// Watch the route for changes to the 'tag' query parameter and update the query
watch(
  () => route.query.tag, // Watch the 'tag' query parameter
  () => {
    updateQuery(); // Update the query whenever 'tag' changes
  },
  { immediate: true } // Run immediately to initialize the query on page load
);

</script>

<style scoped>
/* Fade transition CSS */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>