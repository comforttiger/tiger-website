<template>
    <article class="w-full flex items-center justify-center flex-col">
      <div class="w-2/3">
        <div class="p-5 pl-0">
          <LikesTitle page="girlfriend">{{ post.title }}</LikesTitle>
        </div>
        <div class="text-neutral">
          <ContentRenderer :value="post" class="space-y-2" />
        </div>
      </div>
    </article>
  </template>
  
  <script>
  import { defineComponent } from "@vue/composition-api";
  import { useRoute } from "vue-router";
  
  export default defineComponent({
    async setup() {
      const route = useRoute();
      const { data: post } = await useAsyncData("post", () =>
        queryContent("/likes/girlfriend").findOne()
      );
  
      return {
        post,
      };
    },
  });
  </script>