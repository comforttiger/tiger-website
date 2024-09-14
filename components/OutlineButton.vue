<template>
    <NuxtLink :external="external" :to="url" class="rounded-xl px-2 py-1 text-accent bg-base-100 border-accent border-2 font-display hover:bg-accent hover:text-base-100"><slot /></NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        url: { type: String, required: false },
        external: {type: Boolean, required: false}
    })
</script>