<template>
<div class="w-full flex items-center justify-center">
  <div class="w-full min-h-screen flex flex-col gap-4 px-2 md:max-w-3xl max-w-full">
<div
class="flex h-full min-h-screen flex-col gap-4 rounded-xl"
id="scrolltarget"
>
<!-- search bar -->
<div class="flex gap-2 w-full">
<div class="flex flex-col gap-4 rounded-xl bg-base-100 p-4 text-neutral w-full">
  <TransitionGroup
    class="flex gap-2 overflow-x-auto pb-4 pt-2"
    name="list"
    tag="ul"
  >
    <div v-for="tag in availableTags" :key="tag[0]">
      <FilledButton
        @click="toggleTagSelection(tag[0])"
        class="whitespace-nowrap hover:cursor-pointer"
        v-if="selectedTags.includes(tag[0])"
      >
        #{{ tag[0] }}
      </FilledButton>
      <OutlineButton
        @click="toggleTagSelection(tag[0])"
        class="whitespace-nowrap hover:cursor-pointer"
        v-else
      >
        #{{ tag[0] }}
      </OutlineButton>
    </div>
  </TransitionGroup>
</div>
<div class="bg-base-100 rounded-xl p-4 content-center">
      <OutlineButton external
        url="/watching.xml"
        target="_blank" class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
</svg>
 rss</OutlineButton>
</div>
</div>

<div class="flex justify-between">
  <FilledButton
    @click="previousPage"
    v-if="currentPage > 1"
    class="text-lg hover:cursor-pointer"
  >
    previous
  </FilledButton>
  <span
    class="rounded-xl px-2 py-1 text-primary bg-base-100 border-primary border-2 font-display text-lg"
    disabled
    v-else
  >
    previous
  </span>

  <FilledButton
    @click="nextPage"
    v-if="hasMorePosts"
    class="text-lg hover:cursor-pointer float-end disabled:text-4xl"
  >
    next
  </FilledButton>
  <span
    class="rounded-xl px-2 py-1 text-primary bg-base-100 border-primary border-2 font-display text-lg"
    disabled
    v-else
  >
    next
  </span>
</div>

<div class="flex flex-col gap-4 overflow-y-auto p-2">
  <div v-for="result in paginatedPosts" :key="result.id">
    <MovieCard
      :post="result"
      :id="result._path?.split('/')[2]"
      :selected="selectedTags"
      @tag-clicked="handleTagClick"
    />
  </div>
</div>

<div class="flex justify-between">
  <FilledButton
    @click="previousPage"
    v-if="currentPage > 1"
    class="text-lg hover:cursor-pointer"
  >
    previous
  </FilledButton>
  <span
    class="rounded-xl px-2 py-1 text-primary bg-base-100 border-primary border-2 font-display text-lg"
    disabled
    v-else
  >
    previous
  </span>

  <FilledButton
    @click="nextPage"
    v-if="hasMorePosts"
    class="text-lg hover:cursor-pointer float-end disabled:text-4xl"
  >
    next
  </FilledButton>
  <span
    class="rounded-xl px-2 py-1 text-primary bg-base-100 border-primary border-2 font-display text-lg"
    disabled
    v-else
  >
    next
  </span>
</div>
</div>
</div>
</div>
</template>

<script setup lang="ts">
const selectedTags: Ref<Array<string>> = ref([]);
const postCount = ref(10);
const currentPage = ref(1);

const queryResults = await queryContent("/watching")
.where({ watch_tags: { $exists: true } })
.where({ watch_tags: { $contains: selectedTags.value } })
// .where({ watch_tags: { $not: { $contains: "draft" } } })
.sort({ timestamp: -1 })
.find();

const postsWithMatchingTags = computed(() => {
if (selectedTags.value.length === 0) {
return queryResults;
}
return queryResults.filter((post) => {
for (const selectedTag of selectedTags.value) {
  if (!post.watch_tags.includes(selectedTag)) {
    return false;
  }
}
return true;
});
});

const paginatedPosts = computed(() => {
const start = (currentPage.value - 1) * postCount.value;
return postsWithMatchingTags.value.slice(start, start + postCount.value);
});

const hasMorePosts = computed(() => {
return (
postsWithMatchingTags.value.length > currentPage.value * postCount.value
);
});

function scrollToTarget() {
const targetElement = document.getElementById("scrolltarget");
if (targetElement) {
targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
}
}

function nextPage() {
if (hasMorePosts.value) {
currentPage.value += 1;
scrollToTarget();
}
}

function previousPage() {
if (currentPage.value > 1) {
currentPage.value -= 1;
scrollToTarget();
}
}

const router = useRouter();
const route = useRoute();

function removeTag(tagToRemove: string) {
const currentTags = route.query.tag
? Array.isArray(route.query.tag)
  ? [...route.query.tag]
  : route.query.tag.split(",")
: [];

const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);

const updatedTagsString = updatedTags.join(",");

router.push({
path: route.path,
query:
  updatedTags.length > 0
    ? { ...route.query, tag: updatedTagsString }
    : { ...route.query, tag: undefined },
});
}

function addTag(tag: string) {
// Convert the current `route.query.tag` into an array if it isn't already
let currentTags = route.query.tag
? Array.isArray(route.query.tag)
  ? [...route.query.tag] // If it's already an array, clone it
  : [route.query.tag] // If it's a single string, convert to array
: [];

// Check if the tag is already present
if (!currentTags.includes(tag)) {
// Add the new tag if it doesn't already exist
currentTags.push(tag);
}

// Join the tags into a single comma-separated string
const updatedTags = currentTags.join(",");

// Push the updated query with a single `tag` parameter
router.push({
path: route.path, // Keep the current path
query: { ...route.query, tag: updatedTags }, // Update the `tag` query as a single comma-separated string
});
}

async function toggleTagSelection(tag: string) {
if (selectedTags.value.includes(tag)) {
selectedTags.value = selectedTags.value.filter((item) => item !== tag);
currentPage.value = 1;
removeTag(tag);
return;
}
selectedTags.value.push(tag);
addTag(tag);
currentPage.value = 1;
}

function handleTagClick(tag: string) {
scrollToTarget();
toggleTagSelection(tag);
}

function resetTagSelection() {
selectedTags.value = [];
router.push({
path: route.path,
query: {},
});
}

const availableTags = computed(() => {
let foundTags: Map<string, number> = new Map();
postsWithMatchingTags.value.forEach((contentItem) => {
contentItem.watch_tags.forEach((tag: string) => {
  if (foundTags.get(tag) === undefined && tag != "draft") {
    foundTags.set(tag, 1);
  } else {
    foundTags.set(tag, foundTags.get(tag)! + 1);
  }
});
});
foundTags = new Map([...foundTags].sort((a, b) => b[1] - a[1]));
return foundTags;
});

onMounted(() => {
const tags = useRoute().query.tag;

if (tags) {
const tagArray = Array.isArray(tags)
  ? tags
  : typeof tags === "string"
  ? tags.split(",")
  : [];
tagArray.forEach((tag) => {
  if (tag) {
    selectedTags.value.push(tag);
  }
});
}
});

useSeoMeta({
  title: "lotte's movie diary",
  ogTitle: "lotte's movie diary",
  description: "stuff im watching lately!!",
  ogDescription: "stuff im watching lately!!",
});
</script>

<style>
.list-enter-active,
.list-leave-active {
transition: all 0.24s ease-in-out;
}
.list-enter-from,
.list-leave-to {
opacity: 0%;
transform: scale(0);
}
</style>
