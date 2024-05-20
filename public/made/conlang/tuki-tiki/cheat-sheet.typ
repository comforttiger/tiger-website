#set text(
  font: ("Ubuntu"),
  lang: "en",
  size: 8pt
)

#set page(
  margin: 0.5cm,
  footer: context [
    #set align(center)
    #[#sym.copyright soweli Tesa. 2024. #underline[#text(fill: blue)[#link("https://creativecommons.org/licenses/by-sa/4.0/")[CC BY-SA 4.0]]]]
  ]
)

#let titi(body) = {
  set text(font: "sitelen seli kiwen mono atuki", size: 10pt)
  [#body]
}

#columns(3)[
#[
#set text(size:9pt)
#let titi(body) = {
  set text(font: "sitelen seli kiwen mono atuki", size: 14pt)
  [#body]
}
#[
#set text(size: 16pt)
== vocabulary
]
/ #titi[a] a: all, only, exist, true, ah
/ #titi[ala] ala: no, not, nothing; question marker
/ #titi[i] i: object reference
/ #titi[iku] iku: thing, substance, object
/ #titi[ilu] ilu: tool, use, method, way
/ #titi[ka] ka: being, person, creature, alive
/ #titi[kati] kati: plant, non-moving creature, leaf, page
/ #titi[ki] ki: possible, able, maybe, can
/ #titi[kiku] kiku: rock, hard, earth, ground, land, place
/ #titi[ku] ku: air, gas, spirit, feeling, vibe, sound
/ #titi[la] la: context reference
/ #titi[lapi] lapi: calm, rest, fuzzy, dim, inactive, cold
/ #titi[li] li: third-person pronoun, demonstrative pronoun; subject reference
/ #titi[lika] lika: line, stick, limb
/ #titi[lili] lili: little
/ #titi[lu] lu: preposition, conjunction
/ #titi[lupa] lupa: hole, box, room, mouth, inside
/ #titi[mi] mi: first-person pronoun; subject reference
/ #titi[muku] muku: eat, food, tasty, sweet, pleasant
/ #titi[muti] muti: fun, play, culture, art
/ #titi[paka] paka: break, destroy, violence, conflict
/ #titi[pali] pali: do, make, creation, structure
/ #titi[puka] puka: side, backside, vicinity
/ #titi[pula] pula: good
/ #titi[taka] taka: move, go, come, change, time
/ #titi[tama] tama: same, similar, also, stay the same
/ #titi[tiki] tiki: circle, cycle, repeat, pattern, again, time
/ #titi[tiku] tiku: high, tall, big, important, top, head, sky
/ #titi[tila] tila: second-person pronoun, subject reference
/ #titi[tilu] tilu: water, liquid
/ #titi[timi] timi: question word
/ #titi[tipi] tipi: front, face, vertical surface
/ #titi[titi] titi: image, symbol, mean, represent
/ #titi[tu] tu: a lot, much, many, amount, group
/ #titi[tuki] tuki: language, make noise, talk, think
/ #titi[tula] tula: know, feel, learn, knowledge, document
/ #titi[tulu] tulu: sun, light, warm, colour, energy
/ #titi[uli] uli: want, need, force, goal, direction
/ #titi[upi] upi: new, fresh, begin, start, cause
]

#colbreak()

#[
#set text(size: 16pt)
= tuki tiki
]
_tuki tiki_ is a cute minimalist conlang derived from toki pona, made by ka Tumu. it currently has only 39 words. 

a more detailed grammar reference can be found #underline[#text(fill: blue)[#link("https://docs.google.com/document/d/1HmgjTEchf4ZT1TCFd9ZauyBsyHfeADAWxxhglIQ_p48/edit#heading=h.lpq3iv3qjo6z")[here]]]

== sounds
tuki tiki uses 8 letters: \
m l p t k a i u

tuki tiki's letters can be pronounced like in toki pona, but have many more possible pronunciations. for example, t can be pronounced like s, and l can be pronounced like r!

== titi pula #titi[titi pula]

titi pula is a logography, every tuki titi word has a symbol. in the vocab section, the titi pula symbol is shown next to each word.

== basic sentences
when the subject is just one of the subject references (_mi_ #titi[mi], _tila_ #titi[tila], _li_ #titi[li]), a sentence is made by following it with a simple phrase which then acts as the predicate.

_mi tuki_ #titi[mi tuki] -- i'm talking \
_li a_ #titi[li a] -- that's right \
_tila lili_ #titi[tila lili] -- you're small

when the subject is something else, you use _li_ #titi[li] to separate the subject and predicate.

_ka li lapi_ #titi[ka li lapi] \
-- someone is sleeping

== modifiers
you modify words by putting the modifiers after the head

_kiku li_ #titi[kiku li] -- this land \
_ku pula_ #titi[ku pula] -- good vibes \
_tuki tila li tiku_ #titi[tuki tila li tiku] \
-- what you said is important

when modifying _mi_ or _tila_, repeat that word instead of _li_.

_mi tu mi muku_ #titi[mi tu mi muku] \
-- a lot of us are eating \
_tila a tila pula_ #titi[tila a tila pula] \ 
-- all of you are good / only you are good

== broad meanings
all tuki tiki words have very broad semantic spaces, and tuki tiki tries to take each word's associations and metaphors as far as possible. 

_muku_ #titi[muku] -- food / tasty / sweet / cute

_lapi_ #titi[lapi] -- sleep / tired / comfortable / cold / inactive

_tula_ #titi[tula] -- know / understand / feel / perceive / document

_ku_ #titi[ku] -- air / spirit / feeling / vibe / sound

== objects
objects (what is being affected by the predicate) are introduced with _i_ #titi[i].

_ka li paka i ilu mi_ #titi[ka li paka i ilu mi] \
-- the person ruined my tool

#colbreak()

== helping verbs
helping verbs go at the start of the predicate to modify its meaning.

_mi ki muku i kati_ #titi[mi ki muku i kati] \
-- i can eat plants

some common helping verbs are _uli_ #titi[uli], _ki_~#titi[ki], and _upi_~#titi[upi]

== lu #titi[lu] & la #titi[la]
_lu_ #titi[lu] is a catch-all preposition. it can mean things like _in_, _on_, _by_, _with_, and so on.

it goes at the end to modify the meaning of the whole sentence

_tila muku lu mi_ #titi[tila muku lu mi] \
-- i think you're cute / you're eating next to me

_ku mi li pula lu tila_ #titi[ku mi li pula lu tila] \
-- i feel better around you

_la_ #titi[la] is a context reference, and acts a lot like a reverse _lu_. what goes before _la_ acts as context for what comes after. a whole sentence can be placed before _la_.

_ki la li lu lupa mi_ #titi[ki la li lu lupa mi] \
-- maybe they're at my place

== conjunctions
for multiple subjects, put _lu_ between the subjects.

_mi lu tila mi muti_ #titi[mi lu tila mi muti] \
-- you and i are playing

for multiple predicates or objects, repeat the subject reference or the object reference.

_ka li uli pula li uli muti_ #titi[ka li uli pula li uli muti] \
-- people try to be good and to have fun

_mi taka tiki mi tuki tiki_ #titi[mi taka tiki mi tuki tiki] \
-- i walk in circles and talk repetitively

_tila uli tula i tuki i titi_ #titi[tila uli tula i tuki i titi] \
-- you want to learn speech and writing

== names
in tuki tiki you tukitikinize your name and use it as a modifier. to tukitikinize your name, convert your name into a name that uses only tuki tiki's letters and syllable structure. the first letter of the name is capitalized.

// names are tukitikinized, meaning you fit them to tuki tiki's orthography. each syllable is one consonant then one vowel, with the first consonant of a word being optional. the name is then used as a modifier of a relevant head word, and the first letter of the name is capitalized.

_ka Tika_ -- someone named _Tika_

in titi pula, you write names like in sitelen pona. you put words with lines over and under them, and read the name by the first letter of each word.

#titi[ka [tula i ku a]] -- ka Tika

== questions
yes/no questions are asked with the word ala word pattern, and answered by repeating the word or (word) ala.

_tila lapi ala lapi_ #titi[tila lapi ala lapi] \
-- are you resting? \
_lapi_ #titi[lapi] / _lapi ala_ #titi[lapi ala] / _ala_ #titi[ala] \
-- yes / no / no

open-ended questions are asked by replacing the missing information with timi.

_li timi_ #titi[li timi] -- what is this?
]