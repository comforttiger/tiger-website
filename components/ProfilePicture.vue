<template>
  <div class="min-w-12 min-h-12" v-if="small">
    <NuxtLink v-if="website" :to="website" class="min-w-12 min-h-12">
      <img :src="avatar" class="rounded-xl w-12 h-fit object-scale-down" :style="fallbackStyle" />
    </NuxtLink>
    <img
      v-else
      :src="avatar"
      :style="fallbackStyle"
      class="rounded-xl w-12 h-fit object-scale-down"
    />
  </div>
  <div class="min-h-16 min-w-16" v-else>
    <NuxtLink v-if="website" :to="website" class="min-h-16 min-w-16">
      <img :src="avatar" class="rounded-xl w-16 h-fit object-scale-down" :style="fallbackStyle" />
    </NuxtLink>
    <img
      v-else
      :src="avatar"
      :style="fallbackStyle"
      class="rounded-xl w-16 h-fit object-scale-down"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Function to generate a hue rotation based on an MD5 hash
const generateHueFromHash = (md5Hash: string) => {
  const hashInt = parseInt(md5Hash.slice(0, 6), 16);
  return hashInt % 360;
};

// Function to generate a hue rotation based on a string
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

// Define component props
const props = defineProps({
  name: { type: String, required: false },
  email: { type: String, required: false },
  website: { type: String, required: false },
  small: { type: Boolean, required: false },
});

// Reactive variables for avatar URL and fallback style
const avatar = ref("/images/lilguy.png"); // Use default image immediately
const fallbackStyle = ref({});
fallbackStyle.value = {
  filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg) saturate(0.3) brightness(1.5)`,
};

// Function to update avatar and fallback style based on props
const updateAvatarAndStyle = () => {
  if (props.email) {
    const imageUrl = `http://cdn.libravatar.org/avatar/${props.email}?s=64&d=404`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      avatar.value = imageUrl; // Update avatar if image loads successfully
      fallbackStyle.value = {};
    };

    img.onerror = () => {
      avatar.value = "/images/lilguy.png"; // Set fallback image on error
      fallbackStyle.value = {};
      if (props.email || props.name) {
        const hueRotation = props.email
          ? generateHueFromHash(props.email)
          : generateHueFromString(props.name ? props.name : "anonymous user");
        fallbackStyle.value = {
          filter: `hue-rotate(${hueRotation}deg) saturate(0.3) brightness(1.5)`,
        };
      }
    };
  } else if (props.name) {
    const hueRotation = generateHueFromString(props.name);
    fallbackStyle.value = {
      filter: `hue-rotate(${hueRotation}deg) saturate(0.3) brightness(1.5)`,
    };
  }
};

// Call the function when the component is mounted
onMounted(() => {
  updateAvatarAndStyle();
});
</script>
