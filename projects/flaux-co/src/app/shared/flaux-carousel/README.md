# FlauxCarousel Component

A linear carousel component that displays items in a horizontal line with smooth transitions.

## Features

- **Linear Layout**: Items are positioned horizontally in a straight line
- **Configurable Item Size**: Control the width/height of each carousel item
- **Adjustable Spacing**: Control spacing between items in rem units
- **Visible Items Control**: Set how many items are visible at once
- **Smart Wrap-Around**: First/last elements are hidden during wrap transitions
- **Center Focus**: The center element is highlighted and featured
- **Responsive Design**: Adapts to different screen sizes
- **Touch/Swipe Support**: Native swipe gestures on mobile devices (swipe left/right to navigate)
- **Configurable Swipe**: Enable/disable touch swipe functionality

## Usage

### Basic Usage
```html
<flaux-carousel [items]="carouselItems"></flaux-carousel>
```

### Advanced Configuration
```html
<flaux-carousel 
  [items]="carouselItems"
  [itemWidth]="16"
  [itemSpacing]="3"
  [visibleItems]="7"
  [showControls]="true"
  [enableSwipe]="true">
</flaux-carousel>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `CarouselItem[]` | `[]` | Array of items to display |
| `itemWidth` | `number` | `4` | Width/height of each item in rem |
| `itemSpacing` | `number` | `2` | Spacing between items in rem |
| `visibleItems` | `number` | `5` | Number of items visible at once |
| `showControls` | `boolean` | `true` | Show/hide navigation controls |
| `enableSwipe` | `boolean` | `true` | Enable/disable touch swipe functionality |

## CarouselItem Interface

```typescript
interface CarouselItem {
  id: number;
  text?: string | null;
  imageUrl?: string;
  heading: string;
  subheading?: string;
  linkUrl?: string | null;
}
```

## Linear Movement Behavior

- **Turn Right**: Moves items to the right. First element wraps to last position (hidden during transition).
- **Turn Left**: Moves items to the left. Last element wraps to first position (hidden during transition).

The center element (middle of visible items) is always highlighted and its details are displayed below the carousel.

## Mobile Touch/Swipe Interaction

- **Swipe Left**: Navigate to next item (equivalent to Turn Right)
- **Swipe Right**: Navigate to previous item (equivalent to Turn Left)
- **Minimum Swipe Distance**: 50px horizontal movement required for navigation
- **Smart Detection**: Only horizontal swipes trigger navigation (vertical scrolling is preserved)
- **Mobile Optimizations**: 
  - Navigation controls are hidden on screens ≤ 900px when swipe is enabled
  - Visual swipe indicator appears on mobile
  - Touch-optimized cursor states (grab/grabbing)

## Linear Layout

The carousel creates a horizontal line where:
- Items are positioned in a straight horizontal line
- Center item is the most prominent (larger and fully visible)
- Items outside the visible range have reduced opacity
- Smooth transitions between positions
- Wrap-around elements are invisible during transitions to avoid jarring jumps

## Styling

The component uses CSS custom properties for dynamic styling:
- `--radius`: Arc radius in em
- `--arc-span`: Arc span in degrees

## Examples

### Compact Layout with Close Spacing
```html
<flaux-carousel 
  [items]="items"
  [itemWidth]="12"
  [itemSpacing]="1"
  [visibleItems]="7">
</flaux-carousel>
```

### Spacious Layout with Wide Spacing
```html
<flaux-carousel 
  [items]="items"
  [itemWidth]="18"
  [itemSpacing]="4"
  [visibleItems]="3">
</flaux-carousel>
```
