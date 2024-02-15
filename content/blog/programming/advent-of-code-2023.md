---
title: advent of code 2023 solutions
date: 2023-12-11
description: not all my solutions are great
category: programming
created: 2023-12-01
updated_title: advent of code 2023 - day 11
updated_description: "space!!! i enjoyed doing this one. ruby's #transpose and #combination were very useful today"
link_id: day-11
hide: false
---

here are all my advent of code solutions! i only got to day 11 before i stopped having time to do them, i had fun doing them! this year was my first time doing advent of code,
and i definitely will do it again next year. i might try to see if i can do some more of this year's tasks at some point, because i think it'd be fun! i'll update this post
with future solutions if i do.

[day 1](#day-1) [day 2](#day-2) [day 3](#day-3) [day 4](#day-4) [day 5](#day-5) [day 6](#day-6) [day 7](#day-7) [day 8](#day-8) [day 9](#day-9) [day 10](#day-10) [day 11](#day-11)  

## day 1
### task 1

task 1 was easy. i did it like this

```rust
fn day1_1() {
    let mut numbers: Vec<u32> = Vec::new();

    let input = std::fs::read_to_string("./input").unwrap();

    for line in input.lines() {
        let mut digits: Vec<u32> = Vec::new();
        for character in line.chars() {
            if character.is_ascii_digit() {
                digits.push(char::to_digit(character, 10).unwrap());
            }
        }
        numbers.push(digits.first().unwrap() * 10 + digits.last().unwrap());
    }
    let mut sum = 0;
    for n in numbers {
        sum += n;
    }
    println!("{}", sum);
}
```

### task 2

task 2 is where it gets silly. all i did was add this:

```rust
input = input
        .replace("one", "o1e")
        .replace("two", "t2o")
        .replace("three", "t3e")
        .replace("four", "f4r")
        .replace("five", "f5e")
        .replace("six", "s6x")
        .replace("seven", "s7n")
        .replace("eight", "e8t")
        .replace("nine", "n9e");
```

the reason i replace "two" with "t2o" and so on is because theres an issue if you just replace it with "2", because the input can contain "eightwo", which should turn into "82" but instead would turn into "eigh2".

so i did the silliest possible solution and just put the first and last letters of each number on each side of the digits. now it works! lmao

## task 2
### part 1
my code today is a mess, but i didnt run into any issues at least.

```rust
pub fn part1(input: String) {
    let mut sum = 0;
    for line in input.lines() {
        let id: usize = line
            .split(':')
            .next()
            .unwrap()
            .replace("Game ", "")
            .parse()
            .unwrap();
        let mut is_possible: bool = true;

        for round in line.split(':').nth(1).unwrap().split(';') {
            for cube in round.split(',') {
                let number: usize = cube.split_whitespace().next().unwrap().parse().unwrap();
                let color = cube.split_whitespace().nth(1).unwrap();
                if (color == "red" && number > 12)
                    || (color == "green" && number > 13)
                    || (color == "blue" && number > 14)
                {
                    is_possible = false;
                }
            }
        }
        if is_possible {
            sum += id;
        }
    }
    println!("{sum}");
}
```

i really have to get better at parsing input. i am not Happy with this mess of for loops and splits and nths and all that, and im sure rust pros out there have a much better way to do this. but hey, it works!

### part 2
didnt impose any new challenges like day 1 part 2 did. it was simple :)

```rust
pub fn part2(input: String) {
    let mut sum = 0;

    for line in input.lines() {
        let (mut biggest_red, mut biggest_green, mut biggest_blue) = (0, 0, 0);
        for round in line.split(':').nth(1).unwrap().split(';') {
            for cube in round.split(',') {
                let number: usize = cube.split_whitespace().next().unwrap().parse().unwrap();
                let color = cube.split_whitespace().nth(1).unwrap();
                match color {
                    "red" => biggest_red = biggest_red.max(number),
                    "green" => biggest_green = biggest_green.max(number),
                    "blue" => biggest_blue = biggest_blue.max(number),
                    _ => panic!(),
                }
            }
        }
        sum += biggest_red * biggest_blue * biggest_green;
    }
    println!("{sum}");
}
```

## day 3
as usual, i wrote pretty messy code. but it certainly works!

### task 1
```rust
pub fn part1(input: String) {
    let mut numbers: Vec<u64> = Vec::new();
    for (line_index, line) in input.lines().enumerate() {
        for (char_index, character) in line.chars().enumerate() {
            if !character.is_ascii_digit() && character != '.' {
                numbers.append(&mut get_number(input.clone(), line_index, char_index));
            }
        }
    }
    let mut sum = 0;
    for number in numbers {
        sum += number;
    }
    println!("{sum}");
}
```

my code goes through each line and character until it finds a symbol, then passes the line index, character index, and the input string to another function called `get_number`, which actually does the hard job of finding the numbers that are next to a symbol.

```rust
fn get_number(input: String, line_index: usize, char_index: usize) -> Vec<u64> {
    let mut lines = Vec::new();
    let mut i = 0;
    if line_index != 0 {
        i = line_index - 1
    }
    for n in i..line_index + 2 {
        let line = input.lines().nth(n);
        if let Some(i) = line {
            lines.push(i);
        }
    }
    let mut numbers: Vec<u64> = Vec::new();

    for line in lines {
        let mut number_start: usize = 0;
        let mut number_end: usize = 0;
        let mut number = String::new();

        for (index, character) in line.chars().enumerate() {
            if character.is_ascii_digit() {
                if number.is_empty() {
                    number_start = index;
                    number_end = index;
                } else {
                    number_end = index;
                }
                number.push(character);
            } else if !character.is_ascii_digit()
                && !number.is_empty()
                && (number_start.abs_diff(char_index) <= 1 || number_end.abs_diff(char_index) <= 1)
            {
                numbers.push(number.parse().unwrap());
                number.clear()
            } else {
                number.clear()
            }
        }
        if !number.is_empty()
            && (number_start.abs_diff(char_index) <= 1 || number_end.abs_diff(char_index) <= 1)
        {
            numbers.push(number.parse().unwrap());
            number.clear();
        }
    }
    numbers
}
```

there are many much, much, better ways i could do this, but i went for a really simple (to me) approach of just going character by character through the lines around the symbol. if the character is a digit, i push it to a string, if the next character isnt a digit, i push the full number to a vector if it starts or ends near the symbol, and just clear it otherwise. very flawed solution, i know of better ways to do it, but this solution worked dammit.

the nice thing about `get_number` (which i should really rename lol), is that i didnt have to change it at all when i got to

### task 2
for part 2, i could do almost exactly the same as what i did in part 1

```rust
pub fn part2(input: String) {
    let mut numbers: Vec<u64> = Vec::new();
    for (line_index, line) in input.lines().enumerate() {
        for (char_index, character) in line.chars().enumerate() {
            if !character.is_ascii_digit() && character == '*' {
                let gear = get_number(input.clone(), line_index, char_index);
                if gear.len() == 2 {
                    numbers.push(gear[0] * gear[1]);
                }
            }
        }
    }
    let mut sum = 0;
    for number in numbers {
        sum += number;
    }
    println!("{sum}");
}
```

instead of checking if `character != '.'`, now i just check if `character == '*'`. and then i just check if `get_number` returned 2 numbers, multiply them, and then thats it! part 2 took me like 1 minute!

## day 4
my first solution to part 2 was still computing after i showered and got breakfast, so i had to rethink it
### part 1
today i actually dont think my code is that messy! here it is

```rust
pub fn part1(input: String) {
    let mut sum = 0;
    for line in input.lines() {
        let (winning_numbers, card) = line.split_once(':').unwrap().1.split_once('|').unwrap();
        let winning_numbers: Vec<&str> = winning_numbers.split_whitespace().collect();
        let winners = card
            .split_whitespace()
            .filter(|x| winning_numbers.contains(x))
            .count();
        if winners > 0 {
            sum += 2_u32.pow((winners - 1) as u32);
        }
    }
    println!("{sum}");
}
```

today was pretty easy. i dont have much to say about this solution!

### part 2
part 2 wasnt hard, per se.. but i did at first try a really slow and inefficient solution that was still running by the time i had finished showering and eating. basically, my first solution involved literally copying every card. thats unecessary!

so, here is the solution i ended up with, which takes less than a second to run. (faster than taking a shower)

```rust
pub fn part2(input: String) {
    let mut cards_amt: Vec<usize> = vec![1; input.lines().count()];
    let mut sum = input.lines().count();
    for (index, line) in input.lines().enumerate() {
        let repeat = cards_amt[index];
        let (winning_numbers, card) = line.split_once(':').unwrap().1.split_once('|').unwrap();
        let winning_numbers: Vec<&str> = winning_numbers.split_whitespace().collect();
        let winners = card
            .split_whitespace()
            .filter(|x| winning_numbers.contains(x))
            .count();
        cards_amt
            .iter_mut()
            .take(index + winners + 1)
            .skip(index)
            .for_each(|x| *x += repeat);
        sum += winners * repeat;
    }
    println!("{sum}");
}
```

## day 5
i wrote this one in ruby. part 2 was hard....

### part 1
recently ive been trying to learn ruby. i've been doing the previous days in ruby after solving them in rust, but this time i decided to try to solve it in ruby *first*.

im not sure if it's because today was hard, or because im unfamiliar with ruby, or because i forgot to eat so i was working on an empty stomach, or all of the above, but i struggled a lot!

might not be able to solve part 2 before i go to bed (it is 3 am)

```ruby
# return array of seeds
def get_seeds(input)
  File.readlines(input)[0].split.drop(1).map(&:to_i)
end

# return 2d array. [map][line]
def parse(almanac)
  maps = []
  almanac.each do |map|
    lines = []
    map.each_line do |entry|
      next unless entry =~ /[0-9]/

      lines.push entry
    end
    maps.push lines
  end
  maps
end

def split_into_maps(input)
  File.read(input).split('map:').drop(1)
end

# return array of destination numbers
def get_map_destinations(sources, map)
  destinations = sources.dup
  map.each do |line|
    s, d = get_ranges(line)
    sources.each do |x|
      destinations[destinations.index(x)] = d.first + (x - s.first) if s.cover?(x)
    end
  end
  destinations
end

# return two ranges
def get_ranges(line)
  ranges = line.split
  destination_start = ranges[0].to_i
  source_start = ranges[1].to_i
  finish_offset = ranges[2].to_i

  sources = (source_start...source_start + finish_offset)
  destinations = (destination_start...destination_start + finish_offset)
  [sources, destinations]
end

def part1(input)
  sources = get_seeds(input)
  almanac = parse(split_into_maps(input))
  almanac.each do |map|
    sources = get_map_destinations(sources, map)
  end
  puts sources.min
end

part1('input5')
```

i am happy with the part 1 solution i came up with in the end. just a little lost on how im gonna make it work for part 2.... but i'll figure it out someday

### part 2
i did come up with a part 2 solution eventually (but i am writing this many days after december 5th!)

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

# return array of seeds
def get_seeds(input) = File.readlines(input)[0].split.drop(1).map(&:to_i)
def split_into_maps(input) = File.read(input).split('map:').drop(1)

def get_seeds_ranges(input)
  seeds = []
  ranges = File.readlines(input)[0].split.drop(1).map(&:to_i)
  ranges.each_slice(2) do |start, length|
    seeds.push(start..start + length - 1)
  end
  seeds
end

# return array of destination numbers
def get_map_destinations(sources, map)
  destinations = sources.dup
  map.each do |line|
    s, d = get_ranges(line)
    sources.each do |x|
      destinations[destinations.index(x)] = d.first + (x - s.first) if s.cover?(x)
    end
  end
  destinations
end

# rubocop:disable Metrics
def get_map_destination_ranges(sources, map)
  destinations = []
  unchecked_ranges = sources
  check_next = []
  map.each do |line|
    s, d = get_ranges(line)
    unchecked_ranges.each do |range|
      overlaps = overlaps(range, s)
      if overlaps[0]
        destinations.push d.first + (s.first - overlaps[0].first).abs..d.last - (s.last - overlaps[0].last).abs
      end
      check_next.concat overlaps[1] if overlaps[1]
    end
    unchecked_ranges = check_next
    check_next = []
  end
  destinations.concat(unchecked_ranges)
end

def overlaps(range1, range2)
  return [nil, [range1.first..range1.last]] if range1.first > range2.last || range1.last < range2.first

  overlaps = [nil, []]
  overlaps[0] = [range1.first, range2.first].max..[range1.last, range2.last].min
  overlaps[1].push range1.first..range2.first - 1 if range1.first < range2.first
  overlaps[1].push range2.last + 1..range1.last if range1.last > range2.last

  overlaps
end
# rubocop:enable Metrics

# return two ranges, sources and destinations
def get_ranges(line)
  ranges = line.split
  destination_start = ranges[0].to_i
  source_start = ranges[1].to_i
  finish_offset = ranges[2].to_i

  sources = (source_start...source_start + finish_offset)
  destinations = (destination_start...destination_start + finish_offset)
  [sources, destinations]
end

# return 2d array. [map][line]
def parse(almanac)
  maps = []
  almanac.each do |map|
    lines = []
    map.each_line do |entry|
      next unless entry =~ /[0-9]/

      lines.push entry
    end
    maps.push lines
  end
  maps
end

def part1(input)
  sources = get_seeds(input)
  almanac = parse(split_into_maps(input))
  almanac.each do |map|
    sources = get_map_destinations(sources, map)
  end
  puts sources.min
end

def part2(input)
  sources = get_seeds_ranges(input)
  almanac = parse(split_into_maps(input))
  almanac.each do |map|
    sources = get_map_destination_ranges(sources, map)
  end
  puts smallest(sources)
end

def smallest(ranges)
  smallest = 2**63
  ranges.each do |range|
    smallest = [range.first, smallest].min
  end
  smallest
end
```

basically i store ranges instead of all numbers, and then i check for the *overlaps* between those ranges!

## day 6
today was a nice change of pace
### part 1
today's code is p nice i think!

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

INPUT = 'inputs/6'

def times
  File.readlines(INPUT)[0].split.drop(1).map(&:to_i)
end

def distances
  File.readlines(INPUT)[1].split.drop(1).map(&:to_i)
end

# return an array containing arrays of every winning time for each race by zipping
def get_all_winning_times(times, distances)
  races = []
  times.zip(distances).each do |race|
    races.push(get_winning_times(race[0], race[1]))
  end
  races
end

# get the winning times
def get_winning_times(time, distance)
  records = []
  (0..time).each do |n|
    records.push n if n * (time - n) > distance
  end
  records
end

def multiply_amount_winning_times
  sum = 1
  get_all_winning_times(times, distances).each do |times|
    sum *= times.length
  end
  sum
end

# part 1 answer
puts multiply_amount_winning_times
```

the only thing i really want to improve here is to not iterate through every single possible time. im sure theres probably a really smart math-y or programmer-y way to do it. i'll look into it later

### part 2
part 2 was really easy. all i had to do was add like three new small methods.

```ruby
def time
  File.readlines(INPUT)[0].gsub('Time:', '').gsub(' ', '').to_i
end

def distance
  File.readlines(INPUT)[1].gsub('Distance:', '').gsub(' ', '').to_i
end

def amount_winning_times
  get_winning_times(time, distance).length
end

# part 2 answer
puts amount_winning_times
```

this one takes a few seconds to run, because `get_winning_times` isnt very efficient. but its only a few seconds, so no big deal! i can make it more efficient later

## day 7
wasnt as hard as i expected!

### part 1
for this one i created classes for hands and cards, so i could easily overwrite their <=> function, so i could sort all the hands with array.sort().

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

HIERARCHY = %w[2 3 4 5 6 7 8 9 T J Q K A].freeze

INPUT = 'inputs/7'

# class that represents each hand of cards
class Hand
  include Comparable
  attr_reader :type, :cards, :bid

  def initialize(cards, bid)
    @cards = cards
    @bid = bid
    @type = type_of(@cards)
  end

  def <=>(other)
    return 1 if @type > other.type
    return -1 if @type < other.type

    @cards.zip(other.cards).each do |pair|
      return 1 if pair[0] > pair[1]
      return -1 if pair[0] < pair[1]
    end
    0
  end
end

# class that represents the individual cards
class Card
  include Comparable
  attr_reader :value

  def initialize(value)
    @value = value
  end

  def <=>(other)
    return 0 if @value == other.value
    return 1 if HIERARCHY.index(@value) > HIERARCHY.index(other.value))

    -1
  end
end

# overwriting string class for fun
class String
  def to_card
    Card.new(self)
  end
end

# return type (1-7)
def type_of(hand)
  cards_in_hand = Array.new(13)
  hand.each do |card|
    cards_in_hand[HIERARCHY.index(card.value)] = 0 unless cards_in_hand[HIERARCHY.index(card.value)]
    cards_in_hand[HIERARCHY.index(card.value)] += 1 if cards_in_hand[HIERARCHY.index(card.value)]
  end
  cards_in_hand.delete(nil)
  tally_cards(cards_in_hand)
end

def tally_cards(cards)
  case cards.tally
  when { 5 => 1 } # five of a kind
    7
  when { 4 => 1, 1 => 1 } # four of a kind
    6
  when { 3 => 1, 2 => 1 } # full house
    5
  when { 3 => 1, 1 => 2 } # three of a kind
    4
  when { 2 => 2, 1 => 1 } # two pair
    3
  when { 2 => 1, 1 => 3 } # one pair
    2
  else # high card
    1
  end
end

# parse input file into array of hands
def parse
  hands = []
  File.foreach(INPUT, chomp: true) do |line|
    cards = line.split[0].split('').map(&:to_card)
    bid = line.split[1].to_i
    hands.push(Hand.new(cards, bid))
  end
  hands
end

# go through sorted hands array and get our winnings!!!
def winnings
  sum = 0
  parse.sort.each.with_index do |hand, index|
    sum += hand.bid * (index + 1)
  end
  sum
end

puts winnings
```

at first i called `type_of(cards)` `type(cards)`. that caused Problems that i took like an hour diagnosing. after that, it was smooth sailing.

also, this was my first time messing around with classes in ruby, and i think they were pretty nice to use!

### part 2
i had to change a few things for part 2, but not too much. here's what i changed:

```ruby
# part 2 hierarchy:
JOKER_HIERARCHY = %w[J 2 3 4 5 6 7 8 9 T Q K A].freeze

# true for part 2, false for part 1.
JOKER = true

class Hand
  # ...
  def initialize(cards, bid)
    @cards = cards
    @bid = bid
    @type = if JOKER
              type_of_joker_edition(@cards)
            else
              type_of(@cards)
            end
  end
end

# class that represents the individual cards
class Card
  # ...
  def <=>(other)
    return 0 if @value == other.value

    if (JOKER && JOKER_HIERARCHY.index(@value) > JOKER_HIERARCHY.index(other.value)) ||
       (!JOKER && HIERARCHY.index(@value) > HIERARCHY.index(other.value))
      return 1
    end

    -1
  end
end

def type_of_joker_edition(hand)
  cards_in_hand = Array.new(12)
  jokers = 0
  hand.each do |card|
    if card.value == 'J'
      jokers += 1
      next
    end
    cards_in_hand[JOKER_HIERARCHY.index(card.value) - 1] = 0 unless cards_in_hand[JOKER_HIERARCHY.index(card.value) - 1]
    cards_in_hand[JOKER_HIERARCHY.index(card.value) - 1] += 1 if cards_in_hand[JOKER_HIERARCHY.index(card.value) - 1]
  end
  cards_in_hand.delete(nil)
  return 7 if jokers == 5

  cards_in_hand[cards_in_hand.index(cards_in_hand.max)] += jokers
  tally_cards(cards_in_hand)
end
```

i added a new `type_of` function thats now joker edition. i didnt think very hard about this, but i just kinda assumed that if you add all the jokers to the biggest stack, you'll get the best type. and it seems like i was right, because it worked on my input and the example at least!

i ran into some issues, because i didnt consider what would happen if a hand was JJJJJ, but when i realized i had to account for this i just added a check that makes the type be full house when there are 5 jokers.

other than `type_of_joker_edition`, all i had to do was make a `JOKER_HIERARCHY` with joker being the weakest.

## day 8
i needed some help with this one

part 2 of this one has to be solved smart, otherwise you'll have to wait until the end of the world to get your answer

i can't take like super much credit for this code, because i looked at other ruby solutions to figure out how to use the least common multiple in the solution. but i learned some new things about ruby, like how to make a method that takes a block as an argument, and thats useful to know!

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

# this makes it easy for me to choose between example or main input w/o editing any code
print 'enter for input file, ex for example '
INPUT = "inputs/8#{gets.chomp}".freeze
print 'part 1 or 2? '
PART = gets.chomp

# Node class, has a node to its left and right.
class Node
  include Comparable
  attr_reader :value
  attr_accessor :left, :right

  def initialize(value, left, right)
    @value = value
    @left = left
    @right = right
  end

  def <=>(other)
    return @value <=> other.value if other.instance_variable_defined?(:@value)

    @value <=> other
  end
end

# get first line of input and split it into separate instructions
def instructions = File.open(INPUT).first.chomp.split('')

# creates a hash of nodes
def nodes
  nodes = {}
  File.readlines(INPUT).drop(2).each do |line|
    node, left, right = line.gsub(/[(]|[)]|,|=/, '').split

    nodes.store(node, Node.new(node, left, right))
  end
  nodes
end

# counts steps until node satisfies a condition.
# &condition lets us pass a block to this method, like {_1 == 'ZZZ' } for part 1
def count_steps(nodes, instructions, start, &condition)
  current_node = nodes[start]
  steps = 0
  loop do
    instructions.each do |instruction|
      return steps if condition.call(current_node)

      current_node = nodes[current_node.left] if instruction == 'L'
      current_node = nodes[current_node.right] if instruction == 'R'
      steps += 1
    end
  end
end

# counts steps once from AAA to ZZZ
def traverse(nodes, instructions)
  count_steps(nodes, instructions, 'AAA') { _1 == 'ZZZ' }
end

# counts how many steps it takes for each node ending in A to get to a node ending in Z.
# they will always get to a node ending in Z at a fixed interval (e.g. every 105 steps), and if we then get
# the least common multiple for all of these, thats when they all overlap. it kinda makes sense i guess,
# but i wouldnt have figured it out without reddit.
def traverse_multiple(nodes, instructions)
  nodes.keys.filter { _1.end_with?('A') }.map do |node|
    count_steps(nodes, instructions, node) { _1.value.end_with?('Z') }
  end.reduce(&:lcm)
end

puts traverse(nodes, instructions) if PART == '1'
puts traverse_multiple(nodes, instructions) if PART == '2'
```

## day 9
today was surprisingly easy. here's my solution

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

print 'enter for input, ex for example: '
INPUT = "inputs/9#{gets.chomp}".freeze
print 'part 1 or 2: '
PART = gets.chomp

def get_differences(values)
  all_differences = [values]
  all_differences.push(all_differences[-1].each_cons(2).map { _2 - _1 }) until all_differences[-1].all?(&:zero?)
  all_differences
end

def history_value(differences)
  number_below = 0
  (0..differences.length - 2).reverse_each do |i|
    number_below = differences[i][-1] + number_below if PART == '1'
    number_below = differences[i][0] - number_below if PART == '2'
  end
  number_below
end

def sum_history_values
  sum = 0
  File.foreach(INPUT) do |line|
    sum += history_value(get_differences(line.split.map(&:to_i)))
  end
  sum
end

puts sum_history_values
```

the only change between part 1 and 2 was adding

```ruby
number_below = differences[i][0] - number_below if PART == '2'
```

## day 10
this one was tricky!
### part 1
part 1 wasnt that hard, but i found it very easy to make small mistakes during it, so it took me a bit. this is how my part 1 solution looks now:

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

print 'enter for input, ex for example: '
INPUT = "inputs/10#{gets.chomp}".freeze
print 'part 1 or 2: '
PART = gets.chomp

SYMBOLS = { '|' => %i[north south], '-' => %i[east west],
            'L' => %i[north east], 'J' => %i[north west],
            'F' => %i[south east], '7' => %i[south west],
            '.' => %i[] }.freeze
DIRECTION_OFFSETS = { south: [1, 0], north: [-1, 0], east: [0, 1], west: [0, -1] }.freeze
DIRECTION_OPPOSITES = { south: :north, north: :south, east: :west, west: :east }.freeze

def pipe_array
  pipes = []
  start = [0, 0]
  File.foreach(INPUT).with_index do |line, i|
    start = [i, line =~ /S/] if line =~ /S/
    pipes.push line.chars
  end
  [start, pipes]
end

def next_pipe(from, pipe)
  (SYMBOLS[pipe] - [from])[0]
end

def get_start_pipe(start, pipes)
  i, j = start
  if SYMBOLS[pipes[i][j + 1]].include? :west
    [[i, j + 1], :east]
  elsif SYMBOLS[pipes[i][j - 1]].include? :east
    [[i, j - 1], :west]
  elsif SYMBOLS[pipes[i + 1][j]].include? :north
    [[i + 1, j], :south]
  else
    [[i - 1, j], :north]
  end
end

def pipe_loop(pipes, start, direction)
  loop_coords = []
  i, j = start
  loop_coords.push([i, j])
  loop do
    direction = next_pipe(DIRECTION_OPPOSITES[direction], pipes[i][j])
    i += DIRECTION_OFFSETS[direction][0]
    j += DIRECTION_OFFSETS[direction][1]
    loop_coords.push([i, j])
    return loop_coords if pipes[i][j] == 'S'
  end
end

start, pipes = pipe_array
start_pipe, direction = get_start_pipe(start, pipes)

puts pipe_loop(pipes, start_pipe, direction).length / 2 if PART == '1'
```

### part 2
part 2 is the one i struggled with. i wouldnt have been able to solve it without [this post](https://cohost.org/kero-was-taken/post/3819956-advent-of-code-2023) by [@kero-was-taken](https://cohost.org/kero-was-taken) on cohost. i saw other explanations out there of other methods to solve it, but this was the only one that made sense to me. so, here was how i did it in ruby:

```ruby
def pipe_area(loop)
  sum = 0
  loop.push(loop[0])
  loop.each_cons(2) do |n1, n2|
    x1, y1 = n1
    x2, y2 = n2
    sum += x1 * y2 - x2 * y1
  end
  (sum / 2).abs - (loop.length / 2) + 1
end

puts pipe_area(pipe_loop(pipes, start_pipe, direction)) if PART == '2'
```

## day 11
space!!! i enjoyed doing this one. ruby's #transpose and #combination were very useful today

here's my solution to both parts. the solution is the same for both of them

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

print 'enter for input, ex for example: '
INPUT = "inputs/11#{gets.chomp}".freeze
print 'part 1 or 2: '
PART = gets.chomp

def image = File.readlines(INPUT, chomp: true).map(&:chars)

def blank_columns(image)
  columns = []
  image = image.transpose
  image.each.with_index do |column, index|
    columns.push(index) unless column.include? '#'
  end
  columns
end

def galaxy_coords(image, times)
  coords = []
  blank_columns = blank_columns(image)
  y_offset = 0
  image.each.with_index do |row, y|
    x_offset = 0
    y_offset += times unless row.include? '#'
    row.each.with_index do |char, x|
      x_offset += times if blank_columns.include? x
      coords.push([x + x_offset, y + y_offset]) if char == '#'
    end
  end
  coords
end

def distances(galaxy_coords)
  distances = []
  galaxy_coords.combination(2) do |g1, g2|
    x1, y1 = g1
    x2, y2 = g2
    distances.push((x1 - x2).abs + (y1 - y2).abs)
  end
  distances
end

puts distances(galaxy_coords(image, 1)).reduce(:+) if PART == '1'
puts distances(galaxy_coords(image, 999_999)).reduce(:+) if PART == '2'
```

i just add 1 or 999999 to offset variables, so i can appropriately offset the galaxy coordinates according to how much space has expanded.