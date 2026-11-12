
# Performance Considerations

## 1. Layout Shift (CLS)

The widget is mounted dynamically when the SDK initializes.

This can cause a layout shift because the widget adds content to the page after the initial HTML has been rendered.

### Current implementation

- The widget is mounted inside the merchant-provided container.
- The widget uses a compact layout with padding and a small number of DOM elements.
- Subtotal updates modify the existing paragraph instead of recreating the component.

### Potential improvements

- Reserve space for the widget using a `min-height` on the merchant container.
- Initialize the widget as early as possible.
- Avoid changing the widget's dimensions unnecessarily when the message changes.
- Consider rendering a placeholder with similar dimensions before the SDK loads.

Example:

```css
#abra-root {
  min-height: 100px;
}
```

## 2. Main-thread Work

The widget performs lightweight synchronous operations:

- Calculates the remaining amount.
- Updates text content.
- Updates CSS custom properties.
- Dispatches custom events when shoppers interact with the buttons.

The implementation avoids unnecessary DOM replacement.

The `update()` method changes the existing Web Component instead of creating a new element for every cart update.

For this widget's current scope, these operations are inexpensive and do not require Web Workers or background processing.

### Potential improvements

- Avoid unnecessary updates when the subtotal and configuration have not changed.
- Keep rendering operations limited to the elements that actually need updating.
- Profile the widget in a browser if future features introduce more expensive operations.

## 3. CSS and JavaScript Leakage

### CSS isolation

The widget uses Shadow DOM with `mode: "open"`.

This prevents merchant-page selectors such as:

```css
button {
  background: lime;
  color: purple;
}

p {
  background: yellow;
}
```

from directly styling the widget's internal elements.

Widget styles are defined inside the Shadow Root.

CSS custom properties are applied to the custom element to support merchant configuration.

### JavaScript isolation

The storefront SDK does not depend on React.

The implementation uses:

- TypeScript.
- Native Custom Elements.
- Native Custom Events.
- A small public SDK API.

Events use the `abra:` namespace to reduce naming conflicts with merchant applications.

The custom element is registered only once, avoiding duplicate registration errors.

### Potential improvements

- Publish the SDK as a versioned package.
- Keep the public API small and stable.
- Avoid adding unnecessary global variables.
- Consider supporting multiple widget instances in a future version.
