<template>
    <p>{{ convertDate(date) }}</p>
</template>

<script setup lang="ts">
function convertDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
  });
}
defineProps({
  date: { type: Date, required: true }
})
</script>
