<template>
  <div class="rounded-xl p-5 bg-base-100 flex flex-col gap-2">
    <h2 class="text-primary text-4xl font-display">tags</h2>
    <ul class="flex gap-2 flex-wrap">
      <li class="flex" v-for="tag in tagList" :key="tag"><Tag :tag="tag" /></li>
    </ul>
    <!-- <ul class="flex gap-2 flex-wrap">
      <li class="flex" v-for="tag in extra" :key="tag"><Tag :tag="tag" /></li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { made_tags, blog_tags } from "../data/tags";
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Extract the tag from the query parameters
const tag = computed(() => {
  const tagValue = route.query.tag;

  if (Array.isArray(tagValue)) {
    return tagValue[0] || undefined; // Take the first value if it's an array, or undefined if it's empty
  }

  return tagValue ?? undefined; // Use undefined if the tag is null/undefined
});

const tagList = ref<string[]>([]);

// Function to update the tags based on the route query
async function updateTags() {
  if (tag.value && tag.value !== 'made' && tag.value !== 'blog') {
    const queryResult = await queryContent('/')
      .where({ tags: { $exists: true } })
      .where({ tags: { $contains: tag.value } })
      .only('tags')
      .find();

    // Extract tags from the query result and ensure they are unique
    const allTags = queryResult.map((item: any) => item.tags).flat();
    const uniqueTags = Array.from(new Set(allTags));
    
    tagList.value = uniqueTags;
  } else if (tag.value == 'made') {
    // Default tag list when no specific tag is selected or invalid tag
    tagList.value = made_tags;
  } else if (tag.value == 'blog') {
    tagList.value = blog_tags;
  } else {
    tagList.value = blog_tags.concat(made_tags)
  }
}

// Watch the route query and update the tags accordingly
watch(
  () => route.query.tag,
  () => {
    updateTags();
  },
  { immediate: true }
);
</script>