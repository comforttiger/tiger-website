---
title: ilo pali pi nimi sin
date: 2022-05-03
tags: ["made", "conlang", "toki pona"]
image: /images/made/conlang/toki-pona/ilo-pali-pi-nimi-sin.png
---
[o lukin e ona](https://nimisin.kittycat.homes) (check it out)

this website generates a brand new word for the conlang toki pona, along with example sentences and definitions! i mostly made this to teach myself more rust, and i figured combining the programming language im learning with my special interest would make me learn much faster! here's how it works:

### the word
toki pona has a p predictable syllable structure:

> CV(n)

where C is a consonant, V is a vowel, and n is the letter n. every syllable consists of a consonant, then a vowel, and then optionally the letter n.

in addition, the consonant in the first syllable of a word can be omitted, and the sounds wu, wo, ji, ti, nn, and nm are illegal.

with this syllable structure it's *really* easy to generate valid words through not that much code! the way i did it, i stored the previous letter while generating, and then had lists of letters which were allowed depending on the previous letter (list of letters always allowed, list of letters not allowed after n, etc.). and thats it! i made this because i thought it'd be really easy and i was right!

one last step i do is that i check the generated word against a list of already existing words, and redo the generation if the word generated already exists. i figured the website would be more fun if it was always a plausible nimi sin, and not slapping a new definition to an old word!

### the example sentences
the example sentences were also really simple because of how toki pona works. every word in toki pona can go anywhere in the sentence, and subjects, verbs, etc. are marked by particles. so really all the generation has to do is decide which parts of speech will be present, and then how many words will be in each section, and then just create a sentence like "(x random words) (particle) (x random words) (particle) (x random words)"! the sentences won't always have an obvious meaning, but they are grammatical, so if u think hard enough abt it u can come up with something.

### the definitions
for the definitions i just took a bunch of random merriam webster dictionary definitions, stuffed them into a markov chain, and done. it works surprisingly well, though obviously the definitions will usually be pretty nonsensical.

i also added some jokes into the text file i feed to the markov chain, so sometimes it'll generate things like "loss.jpg", or "car" (a joke based on the frequency at which beginners would propose new words for "car" at the time)