<template>
    <FilledButton v-if="tag == queryTag" class="py-1" url="/">#{{ tag }}</FilledButton>
    <OutlineButton v-else class="py-1" :url="`/?tag=${tag}`">#{{ tag }}</OutlineButton>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

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