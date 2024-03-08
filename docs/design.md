## Style Guide

We use a minimalistic style guide to keep our development simple and consistent. Our main design value is to keep things ruthlessly functinoal. Every button, piece of text, character, color, and image is chiseled away unless it serves a necessary function to help solve users problems. We think of the purpose of design as removing confusion via negativa. Every click saved is a win. When you're developing, please refer to these principles.

We use Tailwind CSS for styling. Here are some common classes we use to help your development. Please feel free to get hyper-creative, this is meant just as a reference to where we're at now.

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
