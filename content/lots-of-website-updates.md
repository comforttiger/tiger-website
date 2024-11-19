---
title: "*lots* of website updates!"
timestamp: 1726448274000
tags: ["blog", "website stuff"]
description: i have been working!! *non-stop* on this website the past few days!!! here's all the stuff i added and some of my thoughts on them :3
---

i have been working!! *non-stop* on this website the past few days!!! here's all the stuff i added and some of my thoughts on them :3

## other cool sites
today i added a section to the right on the home page that links to lots of cool ppl's pages! i decided to style each button to look like each person's website, which is really fun! it gives me an excuse to peek at others' css.. i already learned some things i didn't know before! i didn't know before how much fun looking at someone else's css could be! but like, websites are a great form of personal expression, and there's things you'll notice when you peek at the way someone styled their website, i think... idk, if you're weird like me i recommend peeking at ppl's css more often! it's fun!!

i also really like styling the buttons like this bc it lets me express how cool i think these ppl's websites are, by highlighting the bits i find coolest in my own recreation.. does that make sense? idk!

there's a couple of ppl there now, but i hope to add a lot more soon! the *one* downside to styling each button the way i do is that it does take me like 20 minutes to add one person...

## tags
i spent the past few days adding a tagging system to my posts. i used to have a really messy system of subdirectories, and things could only really be categorized as one "thing". but now i have tags, and every post can have as many tags as it wants! so instead of my photography just being photography, it can also be tagged w the camera i used! all my art can be tagged w more specific art-related tags! and if a piece of art is somehow gamedev related, it can be tagged that too! that was *impossible* before!! 

i'm *really* satisfied with how tags work now.

i also added a system where some tags don't show up in the initial list, but if you pick another tag which has posts w that tag, then they'll show up! so every camera i own doesn't show up in the tag list until you click photography, for example... i wanted to try to make the tag list as uncluttered as possible.

## pagination
i've heard that Loading Every Single Post All At Once is called "bad". that's what i used to do! but after much blood, sweat, and tears, i now have pages. pages was *not* as hard as i thought it'd be to add! the actual pagination itself wasn't so bad, cuz there's lots of ppl who have written articles with the title "How To Create Blog With Pagination Using Nuxt Content"

### the hard part
the HARD PART was getting the newfangled pages to actually ***load*** when i built the website!

you see, i use a thing called "Nuxt Content" to create this little website ur looking at. when i make changes to the website, i run the website locally in a development server so i can look at it before i publish it online. this development server can load any page on the website. HOWEVER, when i want to upload the website to the World wide Web, i have to generate Static pages. these pages can't dynamically ask a server like "hey uhh the user tried to go to a page i dont know, is that real?", so instead the static site generator tries to visit every single link on your website in order to create all the pages someone visiting your page will need.

now, all the pages of my blog are linked on the website, but *for some reason* the static site generator wouldn't recognize it! i still don't know why. i never found a solution

luckily, all hope was not lost. the static site generator does generously let you tell it to generate static pages for specific urls, even if they're not linked anywhere. so what i did was that i created a script that creates a list of every page from `/?page=0` to `/?page=100`, and also for each tag creates a list of every page from `/?page=0&tag=tag` to `/?page=100&tag=tag`. this is incredibly stupid but it does work. the static site generator diligently checks every single one of these urls even though 99% of them are empty (i only have like 3 pages total.. but its useful to future proof these things \:p)

## the future
i JUST had an idea. like. just now as i was about to be done writing this post. right now i have this other section of my website that's fully separated from this one, [/likes](https://comforttiger.space/likes). this whole time i've been thinking like "yeah it's cool that i have this whole website with this cool tagging system and all that, but the likes section? that'll just have to stay separate forever" *no* it doesn't!!!! i'm gonna start working on making the /likes section no longer separate.

why did i get this idea just now? because i'm listening to the Heathers: The Musical soundtrack and i thought like "oh i really wanna write about Heathers: The Musical, my favourite musical" but then i was like ah darn, too bad that the likes section is a messy system of subsections and it's really not worth it to create a new section just for ranting about my favourite musical and- YOU FOOL!!! THAT'S THE WHOLE POINT OF THE TAGGING SYSTEM!!!!!! THE LIKES SECTION *MUST* BECOME ONE WITH THE REST OF THE WEBSITE!!!!!!

i'm not sure yet if everything in the likes section will survive the change. there's some stuff that i think won't. i think i want to minimize the amount of things i have that is just like, a list. so idk if i'll list every artist i like the way i do now? but maybe i'll make like a single blog post, that i can update over time, that lists all my favourite music. yeah. that makes sense. and like, there's some things in there that right now are just like a small part of a list, but i could actually write an entire blog post about them and i'm being *stopped* from doing that by *my own poor website design*!!

ohh you know what i should do? i should write some tag descriptions. it'd be cool if you clicked a tag and then a little description for that specific tag could show up. ok now im just doing a stream of consciousness ramble about all the things i wanna do with my website. WEBSITES ARE FUN!!!!!!!

bye bye! thanks for reading all that!