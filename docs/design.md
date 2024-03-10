## Style Guide

We use a minimalistic style guide to keep our development simple and consistent. Our main design value is to keep things ruthlessly functinoal. Every button, piece of text, character, color, and image is chiseled away unless it serves a necessary function to help solve users problems. We think of the purpose of design as removing confusion via negativa. Every click saved is a win. When you're developing, please refer to these principles.

We use Tailwind CSS for styling. Here are some common classes we use to help your development. Please feel free to get hyper-creative, this is meant just as a reference to where we're at now.

## Design Constraints

For any designs, conform to these principles.

- Rule of Fours: when creating layouts, designers should use multiples of 4 for sizing and spacing elements. This means that measurements like padding, margins, and font sizes should be divisible by 4.
- Golden Ratio: use the golden ratio to create visually appealing designs. This means that the ratio of the larger section to the smaller section is the same as the ratio of the whole to the larger section. This ratio is approximately 1.618.
- Fibonacci: use the Fibonacci sequence to create visually appealing designs. This sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1. The sequence goes 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so on. This sequence is often used to create visually appealing designs because it is found in nature and is thought to be aesthetically pleasing.
- Voronoi Patterns: use Voronoi patterns to create visually appealing designs. These patterns are created by dividing a space into cells based on the distance to a specific set of points. This creates a pattern that is visually interesting and can be used to create visually appealing designs.
- Minimal Surfaces: These surfaces are defined as surfaces that have the smallest possible area for a given boundary. This means that they are often smooth and have interesting shapes that can be used to create visually appealing designs.
- Moiré Patterns: patterns are interference patterns that occur when two or more repetitive patterns are superimposed. These patterns can be found in nature, such as in the overlapping of feathers or the interference of water waves. In design, moiré patterns are used to create optical illusions, visual textures, and security features in printing. Example: Moiré patterns are often used in banknote design as a security feature, making it difficult for counterfeiters to reproduce the intricate, shifting patterns.
- Penrose Tilings: Penrose tilings are a type of non-periodic tiling that can be used to create visually appealing designs. These tilings are made up of two shapes, a kite and a dart, that can be arranged in a non-repeating pattern. This creates a visually interesting design that can be used to create visually appealing designs.
- Fractals: Fractals are complex geometric shapes that can be split into parts, each of which is a reduced-scale copy of the whole. These shapes can be used to create visually appealing designs because they are self-similar and have a high level of detail. Example: Fractals are often used in art and design to create visually interesting patterns and textures. They are also used in computer graphics to create realistic natural phenomena, such as clouds and mountains. **MORE GENERALLY, FRACTALS CAN AND BE APPLIED TO NON-VISUAL ELEMENTS, ANYTHING NATURALISTIC IS FRACTAL.**

## Design Inspiration / Emulation

1. Apple Store: neutrals with blue accents for people, green to give livelyness to the store. We can emulate this. Our interface and overall experience should have this attractive aura you want to live in, adds beauty to your life, generally nice to be around.
2. OpenAI's API's: Example first, less words.

### Typography

```tailwindcss
@layer base {
  .h1 {
    @apply text-5xl font-bold leading-tight tracking-tighter;
  }
  .h2 {
    @apply text-4xl font-bold leading-snug tracking-tight;
  }
  .h3 {
    @apply text-3xl font-bold leading-snug tracking-tight;
  }
  .h4 {
    @apply text-2xl font-bold leading-normal tracking-normal;
  }
  .h5 {
    @apply text-xl font-bold leading-normal tracking-normal;
  }
  .h6 {
    @apply text-lg font-bold leading-relaxed tracking-normal;
  }
  .p {
    @apply text-base leading-relaxed tracking-wide;
  }
  .p-sm {
    @apply text-sm leading-relaxed tracking-wide;
  }
}
```
