<template>
  <article class="w-full flex items-center justify-center flex-col">
    <div class="w-2/3">
    <div class="p-5 pl-0">
    <h1 class="text-4xl text-primary">{{ post.title }}</h1>
    <p class="italic">{{ post.date }}</p>
    </div>
    <div class="text-neutral">
      <ContentRenderer :value="post" />
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
      queryContent(route.path).findOne()
    );

    return {
      post,
    };
  },
});
</script>

<!-- <template>
    <div class="w-full flex items-center justify-center flex-col">
        <ContentDoc v-slot="{ doc }">
            <h1 class="text-4xl text-primary p-5">{{ doc.title }}</h1>
            <p>{{ doc.date }}</p>
            <div class="w-2/3 text-neutral">
                <ContentRenderer :value="doc" />
            </div>
        </ContentDoc>
    </div>
</template> -->
