<template>
  <article class="w-full flex items-center justify-center flex-col">
    <div class="md:w-2/3 w-screen">
      <PostTitle :date="post.date" :category="post.category">{{ post.title }}</PostTitle>
      <!-- <div class="p-5 pl-0">
        <h1 class="text-4xl text-primary">{{ post.title }}</h1>
        <DateComponent :date="post.date" class="italic text-accent" />
      </div> -->
      <div class="text-neutral p-5">
        <ContentRenderer :value="post" class="space-y-2" />
      </div>
    </div>
  </article>
</template>

<!-- <script>
import { defineComponent } from "@vue/composition-api";
import { useRoute } from "vue-router";

export default defineComponent({
  async setup() {
    const route = useRoute();
    const { data: post } = await useAsyncData("post", () =>
      queryContent(route.path).findOne()
    );

    return {
      post,
    };
  },
});
</script> -->

<script setup lang="ts">
  import {useRoute} from "vue-router";

  const post = await queryContent(useRoute().path).findOne();
</script>