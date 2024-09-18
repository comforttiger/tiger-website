<template>
  <FilledButton v-if="tag == queryTag" class="py-1" url="/"
    >#{{ tag }}</FilledButton
  >
  <div
    v-else-if="tag == 'draft'"
    class="py-1 px-2 flex gap-2 border-2 border-accent bg-base-100 text-accent rounded-xl font-display"
    ><svg
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
    {{ tag }}</div
  >
  <OutlineButton v-else class="py-1" :url="`/?tag=${tag}`"
    >#{{ tag }}</OutlineButton
  >
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

// Define the prop for the tag
const props = defineProps({
  tag: { type: String, required: true },
});
// Get the router instance to manipulate the URL
const route = useRoute();

// Safely get the tag from the query parameter
const queryTag = computed(() => {
  const tagValue = route.query.tag;

  // Ensure the tag is a valid string or undefined
  if (Array.isArray(tagValue)) {
    return tagValue[0] || undefined; // Take the first value if it's an array, or undefined if it's empty
  }

  return tagValue ?? undefined; // Use undefined if the tag is null/undefined
});

const router = useRouter();
// Function to update the URL's tag query parameter
function updateTag() {
  // Set the query parameter to the selected tag
  router.push({ query: { tag: props.tag || undefined } });
}
</script>
