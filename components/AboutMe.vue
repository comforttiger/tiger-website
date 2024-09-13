<template>
  <div>
    <div class="bg-base-100 rounded-xl p-5">
      <h2 class="text-primary text-4xl font-display">who am i???</h2>
      <div class="space-y-2">
        <p>hi! i'm tiger, a queer autistic nerd who's inside ur puter!!!</p>
        <p>i love to fuck around, but somehow i have yet to find out...</p>
        <p>
          some of my hobbies include
          <NuxtLink to="/made/art" class="underline text-secondary"
            >making art</NuxtLink
          >,
          <NuxtLink to="/made/games" class="underline text-secondary"
            >developing games</NuxtLink
          >,
          <!-- <NuxtLink to="/blog/games" class="underline text-secondary"
            >playing games</NuxtLink
          >, -->
          <NuxtLink to="/blog/programming" class="underline text-secondary"
            >making computers do things</NuxtLink
          >, and
          <NuxtLink to="/made/photography" class="underline text-secondary"
            >taking pictures</NuxtLink
          >! the full list is endless, but i hope this small selection of things
          will satisfy you. for now.
        </p>
        <p>
          some things i like are
          <NuxtLink to="likes/funny-videos" class="underline text-secondary"
            >funny videos</NuxtLink
          >,
          <NuxtLink to="likes/good-music" class="underline text-secondary"
            >good music</NuxtLink
          >,
          <NuxtLink to="/likes/pets/tiara" class="underline text-secondary">my cat</NuxtLink>,
          <NuxtLink to="/likes/girlfriend" class="underline text-secondary"
            >my girlfriend</NuxtLink
          >, and
          <NuxtLink to="/likes/other-stuff" class="underline text-secondary"
            >other stuff too!</NuxtLink
          >
        </p>

        <h2 class="text-primary text-4xl font-display">rss feeds</h2>
        <p>
          i have three rss feeds. <NuxtLink to="/rss.xml" class="underline text-secondary">/rss.xml</NuxtLink> contains everything, <NuxtLink to="/blog/rss.xml" class="underline text-secondary">/blog/rss.xml</NuxtLink> contains just the blog posts, and <NuxtLink to="/made/rss.xml" class="underline text-secondary">/made/rss.xml</NuxtLink> contains just stuff i've made. put whichever one you want into your feed reader of choice!
        </p>
      </div>
    </div>
  </div>
</template>
