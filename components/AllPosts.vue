<template>
  <div class="flex flex-col gap-2">
    <div class="bg-base-100 rounded-xl p-4">
      <h2 class="text-primary text-4xl font-display">who am i???</h2>
      <div class="space-y-2">
        <p>
          hi!!! i'm <span class="text-primary font-bold">lotte</span>. welcome
          to my little website. my own little space to do whatever i want.
        </p>
        <p>
          my favourite colour is
          <span class="text-primary font-bold">#a67bff</span> (but i also have
          strong feelings for
          <span class="text-[#E63E62] font-bold">#e63e62</span>), my favourite
          animal is the <span class="text-accent font-bold">tiger</span>
          <img class="inline w-6 h-6" src="/favicon.png" />, and i love
          <span class="text-secondary font-bold">rain 🌧️</span> more than
          anything else in the world
        </p>
        <p>
          some of my hobbies include
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('playing');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            playing games</button
          >,
          <NuxtLink to="/watching" class="underline text-secondary">
            watching movies and stuff</NuxtLink
          >,
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('games');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            making games</button
          >, and
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('photography');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            taking pictures</button
          >! the full list is endless, but i hope this small selection of things
          will satisfy you. for now.
        </p>
        <p>
          some things i like are
          <NuxtLink to="/my-cat" class="underline text-secondary"
            >my cat</NuxtLink
          >
          and
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('likes');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            other stuff too!
          </button>
          there's lots of stuff i like that i haven't gotten around to writing
          about yet too, but some day i will get to it!!
        </p>
        <p>
          feel free to
          <NuxtLink to="/guestbook" class="underline text-secondary"
            >sign my guestbook</NuxtLink
          >
          while you're here!
        </p>
      </div>
      <AboutMeButtons />
    </div>
  </div>

  <div
    class="flex h-full min-h-screen flex-col gap-4 rounded-xl"
    id="scrolltarget"
  >
    <!-- search bar -->
    <div class="flex flex-col gap-4 rounded-xl bg-base-100 p-4 text-neutral">
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
      <div
        v-for="(result, index) in paginatedPosts"
        :key="result.id"
      >
        <PostSummary
          :post="result"
          :ask="findAsk(result.ask)"
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
</template>

<script setup lang="ts">
const selectedTags: Ref<Array<string>> = ref([]);
const postCount = ref(10);
const currentPage = ref(1);

const queryResults = await queryContent()
  .where({ tags: { $exists: true } })
  .where({ tags: { $contains: selectedTags.value } })
  .where({ tags: { $not: { $contains: "draft" } } })
  .sort({ timestamp: -1 })
  .find();

const queryAsks = await queryContent("/asks").find();

function findAsk(askPath: string) {
  if (askPath) {
    return queryAsks.find((ask) => ask._file === `asks/${askPath}.md`);
  } else {
    return undefined;
  }
}

const postsWithMatchingTags = computed(() => {
  if (selectedTags.value.length === 0) {
    return queryResults;
  }
  return queryResults.filter((post) => {
    for (const selectedTag of selectedTags.value) {
      if (!post.tags.includes(selectedTag)) {
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
    contentItem.tags.forEach((tag: string) => {
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
