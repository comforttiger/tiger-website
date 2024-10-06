<template>
  <div
    class="rounded-xl p-4 border-2 border-accent flex flex-col gap-4 bg-base-100 w-fit"
  >
    <div class="flex gap-2">
      <div class="min-w-12 min-h-12">
        <NuxtLink v-if="website" :to="website" class="min-w-12 min-h-12">
          <img
            :src="avatar"
            class="rounded-xl w-12 h-fit object-scale-down"
            :style="fallbackStyle"
          />
        </NuxtLink>
        <img
          v-else
          :src="avatar"
          :style="fallbackStyle"
          class="rounded-xl w-12 h-fit object-scale-down"
        />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div class="flex gap-1">
          <span class="font-display text-lg"
            ><FilledButton v-if="website" :url="website" target="_blank">{{
              name ? name : "anonymous user"
            }}</FilledButton
            ><span
              class="rounded-xl px-2 py-1 text-accent bg-base-100 border-accent border-2 font-display"
              v-else
              >{{ name ? name : "anonymous user" }}</span
            >
            asked:</span
          >
        </div>
        <div v-html="renderedContent" class="space-y-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Md5 } from "ts-md5";
import showdown from "showdown";

const h1Extension = () => {
  return [
    {
      type: "output",
      regex: /<h1(.*?)>(.*?)<\/h1>/g,
      replace: (match: string, p1: string, p2: string) => {
        return `<h1 class="text-6xl text-primary font-display"${p1}>${p2}</h1>`;
      },
    },
  ];
};
const h2Extension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<h2(.*?)>(.*?)<\/h2>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<h2 class="text-4xl text-primary font-display"${p1}>${p2}</h2>`;
      },
    },
  ];
};
const h3Extension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<h3(.*?)>(.*?)<\/h3>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<h3 class="text-3xl text-accent font-display"${p1}>${p2}</h3>`;
      },
    },
  ];
};
const h4Extension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<h4(.*?)>(.*?)<\/h4>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<h4 class="text-xl text-accent font-display"${p1}>${p2}</h4>`;
      },
    },
  ];
};
const aExtension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<a(.*?)>(.*?)<\/a>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<a class="text-secondary underline hover:brightness-90"${p1}>${p2}</a>`;
      },
    },
  ];
};
const blockquoteExtension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<blockquote(.*?)>(.*?)<\/blockquote>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<blockquote class="border-l-4 border-accent pl-2"${p1}>${p2}</blockquote>`;
      },
    },
  ];
};
const imgExtension = () => {
  return [
    {
      type: "output", // The output stage modifies the generated HTML
      regex: /<img(.*?)>(.*?)<\/img>/g, // Matches <h2> tags in the output HTML
      replace: (match: string, p1: string, p2: string) => {
        // Modify how the <h2> is rendered
        return `<img class="md:w-1/2"${p1}>${p2}</img>`;
      },
    },
  ];
};
const olExtension = () => {
  return [
    {
      type: "output",
      regex: /<ol([^>]*)>([\s\S]*?)<\/ol>/g,
      replace: (match: string, p1: string, p2: string) => {
        return `<ol class="list-decimal list-inside"${p1}>${p2}</ol>`;
      },
    },
  ];
};
const ulExtension = () => {
  return [
    {
      type: "output",
      regex: /<ul([^>]*)>([\s\S]*?)<\/ul>/g,
      replace: (match: string, p1: string, p2: string) => {
        return `<ul class="list-disc list-inside"${p1}>${p2}</ul>`;
      },
    },
  ];
};

// Add the extension to the Showdown converter
const converter = new showdown.Converter({
  extensions: [
    h1Extension,
    h2Extension,
    h3Extension,
    h4Extension,
    aExtension,
    blockquoteExtension,
    imgExtension,
    olExtension,
    ulExtension,
  ],
  strikethrough: true,
  smoothLivePreview: true,
  requireSpaceBeforeHeadingText: true,
});

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

const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const props = defineProps({
  name: { type: String, required: false },
  email: { type: String, required: false },
  website: { type: String, required: false },
  small: { type: Boolean, required: false },
});

// Reactive variables
const avatar = ref("");
const fallbackStyle = ref({});
const renderedContent = ref("");
const slots = useSlots(); // Get the slots

// Function to update avatar and fallback style based on props
const updateAvatarAndStyle = () => {
  if (props.email) {
    const imageUrl = `http://cdn.libravatar.org/avatar/${Md5.hashStr(
      props.email
    )}?s=64&d=404`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      avatar.value = imageUrl;
      fallbackStyle.value = {};
    };

    img.onerror = () => {
      avatar.value = "/images/lilguy.png";
      fallbackStyle.value = {};
      if (props.email || props.name) {
        const hueRotation = props.email
          ? generateHueFromHash(Md5.hashStr(props.email))
          : generateHueFromString(props.name ? props.name : "anonymous user");
        fallbackStyle.value = {
          filter: `hue-rotate(${hueRotation}deg)`,
        };
      }
    };
  } else {
    avatar.value = "/images/lilguy.png";
    fallbackStyle.value = {};
    if (props.name) {
      const hueRotation = generateHueFromString(props.name);
      fallbackStyle.value = {
        filter: `hue-rotate(${hueRotation}deg)`,
      };
    }
  }
};
// Debounced version of the update function
const debouncedUpdateAvatarAndStyle = debounce(updateAvatarAndStyle, 300);

watch(
  () => [props.name, props.email],
  () => {
    debouncedUpdateAvatarAndStyle();
  }
);

watch(
  () =>
    slots.default
      ? slots
          .default()
          .map((vnode) => vnode.children)
          .join("")
      : "",
  (newContent) => {
    // Convert Markdown to HTML
    renderedContent.value = converter.makeHtml(newContent);
  }
);

// Initial function call
updateAvatarAndStyle();
</script>
