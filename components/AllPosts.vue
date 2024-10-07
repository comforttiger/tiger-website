<template>
  <div class="flex flex-col gap-2">
    <div class="bg-base-100 rounded-xl p-4">
      <h2 class="text-primary text-4xl font-display">who am i???</h2>
      <div class="space-y-2">
        <p>hi! i'm tiger, a queer autistic nerd who's inside ur puter!!!</p>
        <p>i love to fuck around, but somehow i have yet to find out...</p>
        <p>
          some of my hobbies include
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('art');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            making art</button
          >,
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('games');
              toggleTagSelection('made');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            developing games</button
          >,
          <button
            @click="
              resetTagSelection();
              toggleTagSelection('games');
              toggleTagSelection('likes');
              scrollToTarget();
            "
            class="underline text-secondary"
          >
            playing games</button
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
          <!-- <NuxtLink to="/bookmarked-videos" class="underline text-secondary"
            >funny videos</NuxtLink
          >, -->
          <!-- <NuxtLink to="/?tag=music" class="underline text-secondary"
            >good music</NuxtLink
          >, -->
          <NuxtLink to="/my-cat" class="underline text-secondary"
            >my cat</NuxtLink
          >,
          <NuxtLink to="/girlfriend" class="underline text-secondary"
            >my girlfriend</NuxtLink
          >, and
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
          about yet too, so stay tuned :3c
        </p>
      </div>
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

    <!-- body -->
    <div class="flex flex-col gap-4 overflow-y-auto p-2">
      <div v-for="result in paginatedPosts" :key="result.id">
        <!-- Make sure to use a unique key -->
        <PostSummary
          :post="result"
          :selected="selectedTags"
          @tag-clicked="handleTagClick"
        />
      </div>
    </div>

    <!-- Pagination Controls -->
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
const postCount = ref(10); // Number of posts to show at once
const currentPage = ref(1); // Track the current page

const queryResults = await queryContent()
  .where({ tags: { $exists: true } })
  .where({ tags: { $contains: selectedTags.value } })
  .where({ tags: { $not: { $contains: "draft" } } })
  .sort({ timestamp: -1 })
  .find();

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

async function toggleTagSelection(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    currentPage.value = 1;
    return;
  }
  selectedTags.value.push(tag);
  currentPage.value = 1;
}

function handleTagClick(tag: string) {
  scrollToTarget();
  toggleTagSelection(tag);
}

function resetTagSelection() {
  selectedTags.value = [];
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
        toggleTagSelection(tag);
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
