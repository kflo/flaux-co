# Blob Backdrop Component

A customizable Angular component that creates layered circular blob backgrounds with optional image support, inspired by modern UI design patterns.

## Features

- **Configurable blob count**: 1, 2, or 3 blobs
- **Primary color customization**: Any hex color for the main blob
- **Automatic color variations**: Saturated background blob, #111 foreground blob (3-blob mode)
- **Image backdrop support**: Optional background image with customizable resize modes
- **Responsive design**: Adapts to different screen sizes
- **Subtle animations**: Floating effect for dynamic feel
- **Content projection**: Supports nested content

## Usage

### Basic Usage

```typescript
// Import the component
import { BlobBackdropComponent } from '@app/shared/blob-backdrop';

@Component({
  imports: [BlobBackdropComponent],
  // ...
})
export class MyComponent {}
```

```html
<!-- Simple 2-blob backdrop -->
<flaux-blob-backdrop primaryColor="#3B82F6">
  <div class="content">
    <h2>Your content here</h2>
  </div>
</flaux-blob-backdrop>
```

### Advanced Usage

```html
<!-- 3-blob backdrop with image -->
<flaux-blob-backdrop 
  [blobCount]="3" 
  primaryColor="#10B981" 
  imageUrl="/assets/hero-image.jpg"
  imageResize="cover">
  <div class="hero-content">
    <h1>Amazing Product</h1>
    <p>With stunning visual effects</p>
  </div>
</flaux-blob-backdrop>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `blobCount` | `1 \| 2 \| 3` | `2` | Number of blob layers to display |
| `primaryColor` | `string` | `'#3B82F6'` | Hex color for the primary (middle) blob |
| `imageUrl` | `string \| undefined` | `undefined` | Optional background image URL |
| `imageResize` | `ImageResize` | `'cover'` | CSS object-fit value for background image |

### ImageResize Options

- `'cover'` - Scale image to cover entire container (default)
- `'contain'` - Scale image to fit within container
- `'fill'` - Stretch image to fill container
- `'scale-down'` - Use smaller of 'contain' or 'none'
- `'none'` - Use image's natural size

## Color Behavior

### 2 Blobs (Default)
- **Background blob**: Saturated variation of primary color (deeper, more vibrant)
- **Middle blob**: Your specified primary color

### 3 Blobs
- **Background blob**: Saturated variation of primary color
- **Middle blob**: Your specified primary color  
- **Foreground blob**: Dark charcoal (`#111111`)

### 1 Blob
- **Single blob**: Your specified primary color

## Styling

The component uses CSS custom properties and can be styled with standard CSS:

```scss
flaux-blob-backdrop {
  width: 100%;
  height: 400px;
  
  .content-layer {
    // Style your projected content
    text-align: center;
    color: white;
  }
}
```

## Examples

### Marketing Hero Section
```html
<flaux-blob-backdrop 
  [blobCount]="3" 
  primaryColor="#6366F1"
  imageUrl="/assets/product-demo.jpg">
  <div class="hero">
    <h1>Revolutionary Product</h1>
    <p>Experience the future today</p>
    <button>Get Started</button>
  </div>
</flaux-blob-backdrop>
```

### Feature Highlight
```html
<flaux-blob-backdrop 
  [blobCount]="2" 
  primaryColor="#10B981">
  <div class="feature-content">
    <h3>Seamless Integration</h3>
    <p>Works with your existing workflow</p>
  </div>
</flaux-blob-backdrop>
```

### Simple Accent
```html
<flaux-blob-backdrop 
  [blobCount]="1" 
  primaryColor="#F59E0B">
  <div class="accent-text">
    <h4>Key Insight</h4>
  </div>
</flaux-blob-backdrop>
```

## Browser Support

- Modern browsers with CSS blur filter support
- Responsive design for mobile devices
- Graceful degradation for older browsers

## Performance Notes

- Uses CSS transforms and blur filters for smooth animations
- Optimized for 60fps performance
- Minimal DOM elements for efficient rendering
