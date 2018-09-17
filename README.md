# Tailwindcss Half Container Component

A useful component for when you have two full width columns but want to keep your text in both to be in the max width of the page.

Helpful if you have a layout like this for example.

![Example Layout](https://github.com/myleshyson/tailwindcss-half-container/blob/master/Example%20Half%20Container.png "Example Layout")

## How To Use

```js
plugins: [
  ...other plugins,
  require('tailwindcss-half-container')({
    // center: false,
    // padding: 0
  })
]
```

```html
  <div class="flex w-full">
    <div class="half-container"></div>
    <div class="half-container--end"></div>
  </div>
```