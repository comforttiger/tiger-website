<template>
    <pre :class="$props.class" class="prose-pre"><slot /></pre>
  </template>
  
  <script setup lang="ts">
  defineProps({
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    },
    meta: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    }
  })
  </script>
  
  <style>
  pre code .line {
    display: block;
  }
  </style>