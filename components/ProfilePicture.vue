<template>
    <div class="min-w-12 min-h-12" v-if="small">
      <NuxtLink v-if="website" :to="website" class="min-w-12 min-h-12">
        <img
          :src="avatar"
          @error="fallbackImage"
          class="rounded-xl w-12 h-fit"
          :style="fallbackStyle"
        />
      </NuxtLink>
      <img
        v-else
        :src="avatar"
        @error="fallbackImage"
        :style="fallbackStyle"
        class="rounded-xl w-12 h-fit"
      />
    </div>
    <div class="min-h-16 min-w-16" v-else>
      <NuxtLink v-if="website" :to="website" class="min-h-16 min-w-16">
        <img
          :src="avatar"
          @error="fallbackImage"
          class="rounded-xl w-16 h-fit"
          :style="fallbackStyle"
        />
      </NuxtLink>
      <img
        v-else
        :src="avatar"
        @error="fallbackImage"
        :style="fallbackStyle"
        class="rounded-xl w-16 h-fit"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
    name: { type: String, required: true },
    email: { type: String, required: false },
    website: { type: String, required: true },
    small: { type: Boolean, required: false },
  });
  
  // Utility functions
  const generateHueFromHash = (md5Hash: string) => {
    const hashInt = parseInt(md5Hash.slice(0, 6), 16);
    return hashInt % 360;
  };
  
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };
  
  const generateHueFromString = (name: string) => {
    const hash = hashString(name);
    return Math.abs(hash) % 360; // Get a number between 0 and 360
  };
  
  // Reactive variables
  const avatar = ref('');
  const fallbackStyle = ref({});
  
  // Function to update avatar and fallback style based on props
  const updateAvatarAndStyle = () => {
    if (props.email) {
      avatar.value = `http://cdn.libravatar.org/avatar/${props.email}?s=64&d=404`;
    } else {
      avatar.value = '/images/lilguy.png';
      const hueRotation = generateHueFromString(props.name);
      fallbackStyle.value = {
        filter: `hue-rotate(${hueRotation}deg)`,
      };
    }
  };
  
  // Watch for changes in props and update the avatar and style reactively
  watchEffect(() => {
    updateAvatarAndStyle();
  });
  
  // Function to handle fallback when the image fails to load
  const fallbackImage = () => {
    avatar.value = '/images/lilguy.png';
    const hueRotation = props.email ? generateHueFromHash(props.email) : generateHueFromString(props.name);
    fallbackStyle.value = {
      filter: `hue-rotate(${hueRotation}deg)`,
    };
  };
  </script>
  