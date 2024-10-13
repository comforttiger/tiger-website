<template>
  <div class="w-full flex items-center justify-center">
    <div class="min-h-screen flex flex-col gap-16">
      <article
        class="w-full flex items-center justify-center flex-col gap-2 h-entry"
      >
        <div :class="gridClass" class="grid-layout w-screen">
          <data class="p-author h-card">
            <data class="p-name" value="tiger"></data>
            <data class="u-url" value="/"></data>
            <data class="u-logo" value="/favicon.png"></data>
            <data class="u-photo" value="/favicon.png"></data>
          </data>
          <data class="u-url" :value="useRoute().path"></data>
          <data class="p-category" v-for="tag in post.tags" :value="tag"></data>
          <PostTitle
            v-if="!post.no_title"
            class="title"
            :timestamp="post.timestamp"
            :tags="post.tags"
            :draft="post.tags.includes('draft')"
            >{{ post.title }}</PostTitle
          >
          <div
            v-if="post.photos"
            class="columns-lg gap-2 rounded-xl bg-base-100 p-5 media"
          >
            <div class="flex flex-col gap-2">
              <img v-for="photo in post.photos" :src="photo" class="u-photo" />
            </div>
          </div>
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.image_description"
            class="w-fit p-5 bg-base-100 rounded-xl media u-photo"
          />
          <iframe
            v-if="post.video"
            :src="post.video"
            class="w-fit aspect-video p-5 bg-base-100 rounded-xl media"
          ></iframe>
          <Ask v-if="ask" :ask="ask" class="max-w-xl ask" />
          <div
            v-if="post.body && post.body.toc!.links.length"
            class="rounded-xl bg-base-100 p-4 flex flex-col gap-3 h-fit toc top-10 md:sticky"
          >
            <h2
              class="text-2xl text-primary font-display border-b-2 border-primary"
            >
              table of contents
            </h2>
            <a
              href="#"
              class="hover:text-accent hidden md:inline text-primary font-bold"
              >(top)</a
            >
            <ul class="ml-4 text-primary font-bold flex flex-col gap-3">
              <li v-for="link of post.body!.toc!.links" :key="link.id">
                <a :href="`#${link.id}`" class="hover:text-accent">{{
                  link.text
                }}</a>
                <ul class="ml-4 flex flex-col gap-1">
                  <li v-for="link1 of link.children" :key="link1.id">
                    <a :href="`#${link1.id}`" class="hover:text-accent">{{
                      link1.text
                    }}</a>
                  </li>
                </ul>
              </li>
            </ul>
            <a
              href="#comments"
              class="hover:text-accent text-primary font-bold flex gap-2 items-center"
            >
              comments</a
            >
          </div>
          <div
            v-if="post.body && post.body.children.length > 0"
            class="text-neutral p-5 bg-base-100 rounded-xl content"
          >
            <ContentRenderer :value="post" class="space-y-3 e-content" />
          </div>
          <div v-if="post.no_title" class="tags">
            <Draft v-if="post.tags.includes('draft')" />
            <div class="flex gap-2 flex-wrap h-fit">
              <DateComponent
                v-if="!post.tags.includes('draft')"
                :timestamp="post.timestamp"
                class="border-primary border-2 px-2 py-1 text-primary bg-base-100 rounded-xl font-display h-fit dt-published"
              />
              <div v-for="tag in post.tags" class="flex">
                <div
                  v-if="tag == 'draft'"
                  class="py-1 px-2 flex gap-2 border-2 border-primary bg-base-100 text-primary rounded-xl font-display"
                >
                  <svg
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
                  {{ tag }}
                </div>
                <OutlineButton :to="{ path: '/', query: { tag: tag } }" v-else
                  >#{{ tag }}</OutlineButton
                >
              </div>
              <!-- <Tag v-for="tag in tags" :tag="tag" class="hover:bg-base-100 hover:text-accent" /> -->
            </div>
          </div>
          <div class="flex flex-col gap-4 comments mt-16" id="comments">
            <div
              v-if="comments.length"
              class="flex flex-col gap-2 md:w-full w-screen"
            >
              <Comment
                :path="useRoute().path"
                :comment="comment"
                v-for="comment in comments"
              />
            </div>
            <div
              v-else
              class="rounded-xl p-5 text-accent bg-base-100 w-fit font-display text-lg flex gap-2 items-center"
            >
              there are no comments! yet...
            </div>
            <CommentForm :slug="useRoute().path.slice(1)" />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

const post = await queryContent(useRoute().path).findOne();

const comments = ref<ParsedContent[]>([]);

const initialComments = await queryContent(`/comments${useRoute().path}`)
  .sort({ timestamp: 1 })
  .where({ reply: { $exists: false } })
  .where({ pending: { $exists: false } })
  .find();

comments.value = initialComments;

const checkHashForPendingComment = async () => {
  const hash = useRoute().hash;
  if (hash.length) {
    const timestamp = Number(hash.slice(1));

    // Only continue if the timestamp is a valid number
    if (!isNaN(timestamp)) {
      try {
        const pendingComment = await queryContent("/comments")
          .where({ pending: { $exists: true } })
          .where({ reply: { $exists: false } })
          .where({ timestamp })
          .find();

        if (
          pendingComment.length &&
          !comments.value.find(
            (comment: ParsedContent) => comment._id === pendingComment[0]._id
          )
        ) {
          comments.value.push(pendingComment[0]);
        }
      } catch (error) {
        console.warn("No pending comment found for the timestamp:", timestamp);
      }
    }
  }
};

onMounted(async () => {
  await checkHashForPendingComment();
});

const ask = post.ask
  ? await queryContent(`/asks/${post.ask}`).findOne()
  : undefined;

let description = "";
description = ask ? `${ask.name} asked: ${ask.description}` : post.description;

useSeoMeta({
  title: post.no_title ? `tiger's website :3 - ${description.slice(0, 30)}...` : post.title,
  ogTitle: post.title,
  description: description,
  ogDescription: description,
  ogImage: post.image ?? post.photos?.[0],
});

const gridClass = computed(() => {
  return post.body && post.body.toc && post.body.toc.links.length
    ? "grid-2-cols"
    : "grid-1-col";
});
</script>

<style scoped>
/* Define the grid layouts for 1-column and 2-column scenarios */
.grid-layout {
  gap: 16px;
}

/* Two-column layout for when the Table of Contents is present */
.grid-2-cols {
  display: grid;
}

@media only screen and (min-width: 768px) {
  .grid-2-cols {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      ". title"
      ". media"
      ". ask"
      "toc content"
      ". tags"
      ". comments";
    max-width: 64rem;
  }
}

@media only screen and (max-width: 768px) {
  .grid-2-cols {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "media"
      "ask"
      "toc"
      "content"
      "tags"
      "comments";
    max-width: 48rem /* 768px */;
  }
}

/* One-column layout for when the Table of Contents is absent */
.grid-1-col {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "media"
    "ask"
    "toc"
    "content"
    "tags"
    "comments";
  max-width: 48rem /* 768px */;
}

.title {
  grid-area: title;
}

.media {
  grid-area: media;
}

.toc {
  grid-area: toc;
}

.content {
  grid-area: content;
}

.ask {
  grid-area: ask;
}

.comments {
  grid-area: comments;
}

.tags {
  grid-area: tags;
}
</style>
