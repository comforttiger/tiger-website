<template>
    <div>
        <PostBlog :post="post" v-if="post.category == 'diary'" />
        <PostGame :post="post" v-else-if="post.category == 'game'" />
    </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from '@nuxt/content/dist/runtime/types';

defineProps({
    post: { type: Object as PropType<ParsedContent>, required: true},
})
</script>