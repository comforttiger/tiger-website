<template>
    <div class="rounded-xl p-4 border-2 border-accent flex flex-col gap-4 bg-base-100 w-fit">
        <span class="font-display text-lg "><FilledButton v-if="query.website" :url="query.website" target="_blank">{{ query.name }}</FilledButton><OutlineButton v-else>{{ query.name }}</OutlineButton> asked:</span>
         <ContentRenderer :value="query"></ContentRenderer>
    </div>
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";
    const props = defineProps({
        ask: { type: String, required: true }
    })

    const query = await queryContent(`/asks/${props.ask}`).findOne()
</script>