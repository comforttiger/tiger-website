<template>
  <div class="bg-base-100 rounded-xl p-5 flex flex-col gap-5">
    <h2 class="text-primary text-4xl font-display">links</h2>
    <div class="flex justify-evenly">
      <OutlineButton external url="/rss.xml" class="w-fit flex gap-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
          rss feed</OutlineButton
        >
    </div>
    <ul class="flex flex-row flex-wrap justify-evenly gap-2 2xl:px-10">
      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="mailto:tiger@kittycat.homes"
        >
          e-mail</OutlineButton
        >
      </li>
      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://discord.com/users/152843864342790145"
        >
          discord</OutlineButton
        >
      </li>
      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://matrix.to/#/@tiger:matrix.kittycat.homes"
        >
          matrix</OutlineButton
        >
      </li>

      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://goblin.band/@comforttiger"
        >
          fediverse</OutlineButton
        >
      </li>
      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://bsky.app/profile/tiger.kittycat.homes"
        >
          bluesky</OutlineButton
        >
      </li>
      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://comforttiger.newgrounds.com"
        >
          newgrounds</OutlineButton
        >
      </li>

      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://twitch.tv/comforttiger"
        >
          twitch</OutlineButton
        >
      </li>

      <li>
        <OutlineButton
          class="flex gap-2 w-fit"
          url="https://ko-fi.com/S6S6IOYYY"
        >
          ko-fi</OutlineButton
        >
      </li>
    </ul>

    <!-- <div>
      <ul>
        <li>
          e-mail ~
          <NuxtLink to="mailto:tiger@kittycat.homes" class="text-secondary underline"
            >tiger@kittycat.homes</NuxtLink
          >
        </li>
        <li>
          matrix ~ <NuxtLink to="https://matrix.to/#/@tiger:matrix.kittycat.homes" class="text-secondary underline">@tiger:matrix.kittycat.homes</NuxtLink>
        </li>
        <li>
            discord ~ <NuxtLink to="https://discord.com/users/152843864342790145" class="text-secondary underline">comforttiger#0</NuxtLink>
        </li>
        <li>
            fediverse ~ <NuxtLink to="https://goblin.band/@comforttiger" class="text-secondary underline">@comforttiger@goblin.band</NuxtLink>
        </li>
        <li>newgrounds ~ <NuxtLink to="https://comforttiger.newgrounds.com" class="text-secondary underline">comforttiger</NuxtLink></li>
      </ul>
    </div> -->
  </div>
</template>
