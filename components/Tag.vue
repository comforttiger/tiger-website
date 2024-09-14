<template>
    <OutlineButton :url="`/tagged/${tag}`">#{{ tag }}</OutlineButton>
</template>

<script setup lang="ts">
defineProps({
    tag: {type: String, required: true}
})
</script>