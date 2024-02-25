<template>
    <div class="bg-base-100 rounded-xl p-5 border-l-4 border-accent">
        <PostGame :post="post" v-if="post.category == 'game'" />
        <PostPhotography :post="post" v-else-if="post.category == 'photography'" />
        <PostArt :post="post" v-else-if="post.category == 'art'" />
        <PostBlog :post="post" v-else />
    </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from '@nuxt/content/dist/runtime/types';

defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true},
})
</script>