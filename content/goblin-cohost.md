---
title: goblin cohost theme
timestamp: 1726092000000
tags: ["made"]
image: /images/made/other/goblin-cohost.webp
image_description: "a screenshot of the home timeline on goblin.cohost. the colour scheme is similar to cohost's"
---
i made two userstyles, one that changes the colour scheme and stuff to make goblin.band feel more like cohost, and one that removes numbers. feel free to install one or the other or both!

i've not tested them that much, so while it should look good when looking at profile pages and at your timeline, i can't guarantee it'll look good everywhere else, although it's probably *fine*. the no numbers userstyle shouldn't be able to cause any issues though

## how to use
you can go in goblin.band's settings > theme, and plop the css from the two codeblocks into the custom css field. this requires no extensions and should work on any platform that goblin.band works on.

if you can though, i recommend getting an extension like stylus ([firefox](https://addons.mozilla.org/firefox/addon/styl-us/), [chrome](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)), because that way you can disable the theme much quicker, in case it makes a page unreadable.

## no numbers
this one is simple. it removes numbers. let me know if i missed any numbers!

you can copy paste the css below, or install it from [userstyles.world](https://userstyles.world/style/18083/no-numbers)

```css
.count, .noteCount * > b, .noteCount > b, .status * > b, ._tab_qvmq5_1._tabActive_qvmq5_14._button > span {
    display: none !important;
}

.status {
    font-size: 130%;
}
```

## cohost theme
this one changes the colour scheme to feel more like cohost. let me know if anything's broken, and i'll fix it if i ever have time!

you can copy paste the css below, or install it from [userstyles.world](https://userstyles.world/style/18082/goblin-cohost)

ONE IMPORTANT THING: use the goblin night theme when using this userstyle. if you use any other theme, it will look bad!

```css
* {
    --postBg: rgb(255, 255, 255);
    --postFg: rgb(25, 25, 25);
    --notWhite: rgb(255, 249, 242);

    --accent: rgb(131, 37, 79) !important;
    --accent2: rgb(255, 171, 92);
    --bg: rgb(25, 25, 25) !important;
    --accentDarken: rgb(91, 26, 55) !important;
    --accentLighten: rgb(171, 48, 103) !important;
    --accentFg: var(--postBg);
    --accent2Fg: var(--postFg);

    --accentedBg: rgba(131, 37, 79, 0.15) !important;
    --focus: rgba(131, 37, 79, 0.3) !important;
    --acrylicBg: rgba(25, 25, 25, 0.5) !important;
    --fgTransparentWeak: rgba(25, 25, 25, 0.75) !important;
    --fgTransparent: rgba(25, 25, 25, 0.5) !important;
    --fgHighlighted: rgb(33, 33, 33) !important;
    --fgOnAccent: var(--postFg) !important;
    --divider: rgba(255, 255, 255, 0.1) !important;
    --indicator: var(--accent2) !important;
    --navIndicator: var(--accent2) !important;
    --buttonBg: var(--accent2) !important;
    --buttonFg: var(--accent2Fg);
    --buttonGradateA: var(--accent2) !important;
    --buttonGradateB: var(--accent2) !important;
    --buttonHoverBg: var(--accent) !important;
    --mention: var(--indicator) !important;
    --mentionMe: var(--mention) !important;
    --shadow: transparent !important;
    --swutchOnBg: var(--accent) !important;
    --swutchOnFg: var(--postFg) !important;
    --swutchOffBg: var(--bg) !important;
    --swutchOffFg: var(--postFg) !important;
}

/* button */
._button.inline:hover,
._button.post:hover::before,
.follow-button:hover,
.header._button:hover,
._formRoot * ._button:hover {
    filter: brightness(90%) !important;
    background-color: var(--buttonBg) !important;
}

.pxhvhrfw > button {
    color: #fff !important;
}


/* accent2 */
._formRoot * ._button,
._formRoot * ._button:hover,
.follow-button,
.follow-button *,
.new > ._buttonPrimary._shadow::before,
.mention {
    background-color: var(--accent2) !important
}

.follow-button,
.follow-button *,
.new > ._buttonPrimary._shadow::before,
._formRoot * ._button,
._formRoot * ._button:hover,
.mention,
.mention *,
._button.post *,
._button.post:hover * {
    color: var(--accent2Fg) !important;
}

.mention {
    text-decoration-color: var(--accent2Fg) !important;
}

.active *,
._button.item:hover *,
.item.index:hover *,
.pxhvhrfw > button[aria-selected="true"],
.pxhvhrfw > button:hover {
    color: var(--accent2) !important;
}

/* accent */
._button.primary:hover,
.clear.tabs::before,
.noteTag,
.hashtag,
button._button.fade *,
button._button.showLess *,
button._button.submit,
.block-button,
._block.main,
.user-card,
.user-card > .title,
.title > .username * {
    background-color: var(--accent) !important;
}

button._button.fade:hover *,
button._button.showLess:hover * {
    background-color: var(--accentDarken) !important;
}

button._button.fade *,
button._button.showLess *,
button._button.submit,
.block-button,
._block.main,
.user-card,
.user-card > .title,
.title > .username *,
.noteTag,
.hashtag,
.hashtag *,
.fields *,
.description * > a,
.fields * blockquote,
button._button.fade:hover *,
button._button.showLess:hover * {
    color: var(--accentFg) !important;
}

.info,
.cw,
.url-preview {
    color: var(--accent) !important;
}

.fields *,
.description * > a,
.noteTag,
.hashtag {
    text-decoration-color: var(--accentFg) !important;
}
.fields * .mention *,
.fields * .mention,
.description * .mention *,
.description * .mention {
    text-decoration-color: var(--accent2Fg) !important;
    color: var(--accent2Fg) !important;
}

/* not white */
.cw,
.url-preview {
    background-color: var(--notWhite) !important;
}

/* bg */
.pxhvhrfw > button:hover {
    background-color: var(--bg) !important;
}


/* border stuff */
.active *,
._button.item:hover *,
.item.index:hover *,
.active.item,
.pxhvhrfw > button[aria-selected="true"],
.pxhvhrfw > button:hover,
.mention {
    border-color: var(--accent2) !important;
}

.noteTag,
.hashtag,
.cw,
.url-preview {
    border: var(--accent) !important;
}

._formRoot * .input,
.adhpbeou._formBlock,
._formRoot * .info {
    border: var(--postFg) !important;
}

.mention,
.noteTag,
.hashtag {
    padding: 5px !important;
}

.rrevdjwu,
._formRoot,
.adhpbeou._formBlock,
.ssazuxis._gap {
    padding: 10px;
}

.mention,
.noteTag,
.hashtag,
.active.item,
.cw,
.url-preview,
.pxhvhrfw > button[aria-selected="true"],
.pxhvhrfw > button:hover,
._formRoot * .input,
.adhpbeou._formBlock,
._formRoot * .info {
    border-style: solid !important;
    border-width: 1px !important;
}

.rrevdjwu,
._formRoot,
.adhpbeou._formBlock,
.ssazuxis._gap,
.mention,
.noteTag,
.hashtag,
.active.item,
.cw,
.url-preview,
.pxhvhrfw > button[aria-selected="true"],
.pxhvhrfw > button:hover {
    border-radius: 10px !important;
}

.previews,
.follow-button,
.block-button {
    border: none !important;
}


/* postss */
article,
.rrevdjwu,
._formRoot,
.ssazuxis._gap,
.bottomSection > .pxhvhrfw > ._button,
.adhpbeou._formBlock *,
._formRoot * .info,
.timnmucd {
    background-color: var(--postBg) !important;
}

p > a,
.rrevdjwu *,
._formRoot *,
article,
.rrevdjwu,
._formRoot,
.ssazuxis._gap,
.bottomSection > .pxhvhrfw > ._button {
    color: var(--postFg) !important
}


/* other */
.cw > span {
    font-weight: bold;
}

.cw > span::before {
    content: "This post has content warnings for: ";
    font-weight: normal;
}

header._button::before {
    display: none;
}

header._button {
    margin-bottom: 10px;
}

.bottomSection > .pxhvhrfw > ._button {
    border: none !important;
}

.bottomSection > .pxhvhrfw > ._button[aria-selected="true"] {
    border-bottom: 2px solid var(--bg) !important;
    border-radius: 0px !important;
}

._button.showLess * {
    box-shadow: none !important;
}

._button.post:hover * {
    color: var(--accent2Fg) !important;
}

.follow-button,
.follow-button * {
    color: var(--accent2Fg) !important;
}

.noteTag {
    text-decoration: none;
}
```