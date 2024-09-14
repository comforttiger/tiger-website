<template>
    <FrontPage :tag="tag" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const tag = useRoute().params.slug[0]

// const post = await queryContent(useRoute().path).findOne();
</script>