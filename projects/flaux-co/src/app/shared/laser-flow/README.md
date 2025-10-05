# LaserFlow Component

A sophisticated WebGL-based laser flow effect component for Angular, ported from React using Three.js.

## Features

- Dynamic laser light effects with customizable properties
- Volumetric fog rendering
- Animated wisps (micro-streaks) that travel along the beam
- Mouse interaction with smooth interpolation
- Automatic performance optimization with dynamic DPI scaling
- Responsive design with automatic resizing
- Visibility detection to pause when not in view
- WebGL context loss/restore handling

## Installation

The component is already set up in your Angular project. Make sure you have Three.js installed:

```bash
npm install three @types/three
```

## Usage

### Basic Usage

```typescript
import { LaserFlowComponent } from './shared/laser-flow/laser-flow.component';

@Component({
  template: `
    <div style="height: 400px; background: black;">
      <app-laser-flow></app-laser-flow>
    </div>
  `,
  imports: [LaserFlowComponent]
})
export class MyComponent { }
```

### Advanced Usage with Custom Properties

```typescript
@Component({
  template: `
    <div style="height: 400px; background: black;">
      <app-laser-flow 
        [color]="'#00ff00'"
        [wispDensity]="1.5"
        [flowSpeed]="0.5"
        [fogIntensity]="0.6"
        [verticalSizing]="2.5"
        [horizontalSizing]="0.8">
      </app-laser-flow>
    </div>
  `,
  imports: [LaserFlowComponent]
})
export class MyComponent { }
```

## Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class name |
| `wispDensity` | `number` | `1` | Density of animated wisps (0-2) |
| `dpr` | `number` | `undefined` | Device pixel ratio override |
| `mouseSmoothTime` | `number` | `0.0` | Mouse movement smoothing time |
| `mouseTiltStrength` | `number` | `0.01` | Mouse tilt interaction strength |
| `horizontalBeamOffset` | `number` | `0.1` | Horizontal beam position offset |
| `verticalBeamOffset` | `number` | `0.0` | Vertical beam position offset |
| `flowSpeed` | `number` | `0.35` | Speed of the flowing animation |
| `verticalSizing` | `number` | `2.0` | Vertical size scaling factor |
| `horizontalSizing` | `number` | `0.5` | Horizontal size scaling factor |
| `fogIntensity` | `number` | `0.45` | Intensity of volumetric fog |
| `fogScale` | `number` | `0.3` | Scale of fog texture |
| `wispSpeed` | `number` | `15.0` | Speed of wisp animation |
| `wispIntensity` | `number` | `5.0` | Intensity of wisps |
| `flowStrength` | `number` | `0.25` | Strength of flow modulation |
| `decay` | `number` | `1.1` | Beam decay factor |
| `falloffStart` | `number` | `1.2` | Distance falloff start |
| `fogFallSpeed` | `number` | `0.6` | Speed of fog falling animation |
| `color` | `string` | `'#FF79C6'` | Hex color of the laser |

## Styling

The component creates a container with the class `laser-flow-container`. You can style it as needed:

```scss
.laser-flow-container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none; // Default - allows mouse interaction with underlying elements
}
```

**Important**: Make sure the parent container has explicit dimensions for the canvas to inherit:

```scss
.my-laser-wrapper {
  width: 800px;
  height: 400px;
  // or use viewport units
  width: 100vw;
  height: 50vh;
}
```

## Methods

### `resize()`
Manually trigger a resize of the canvas. Useful if the parent container size changes programmatically:

```typescript
@ViewChild(LaserFlowComponent) laserFlow!: LaserFlowComponent;

onParentResize() {
  this.laserFlow.resize();
}
```

## Demo

Visit `/laser-flow-demo` to see the component in action with different configurations.

## Performance Notes

- The component automatically adjusts rendering quality based on frame rate
- It pauses rendering when not visible to save resources  
- WebGL context loss is handled gracefully
- Mouse interactions are optimized with smooth interpolation

## Browser Compatibility

- Requires WebGL support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback handling for WebGL context issues
