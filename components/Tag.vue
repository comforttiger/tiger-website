<template>
    <OutlineButton class="py-1" :url="`/tagged/${tag}`">#{{ tag }}</OutlineButton>
</template>

<script setup lang="ts">
defineProps({
    tag: {type: String, required: true}
})
</script>