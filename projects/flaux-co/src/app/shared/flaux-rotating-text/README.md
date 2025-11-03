# Flaux Rotating Text Component

Angular port of ReactBits RotatingText component.

## Usage

```typescript
import { FlauxRotatingTextComponent } from '@app/shared/flaux-rotating-text/flaux-rotating-text.component';

// In your component
@Component({
  imports: [FlauxRotatingTextComponent]
})
```

```html
<flaux-rotating-text
  [texts]="['React', 'Angular', 'Is', 'Cool!']"
  [staggerFrom]="'last'"
  [staggerDuration]="25"
  [animationDuration]="400"
  [animationEasing]="'cubic-bezier(0.34, 1.56, 0.64, 1)'"
  [rotationInterval]="2000">
</flaux-rotating-text>
```

## Inputs

| Property            | Type                                                  | Default        | Description                            |
| ------------------- | ----------------------------------------------------- | -------------- | -------------------------------------- |
| `texts`             | `string[]`                                            | `[]`           | Array of texts to rotate through       |
| `rotationInterval`  | `number`                                              | `2000`         | Time in ms between rotations           |
| `staggerDuration`   | `number`                                              | `0`            | Stagger delay in ms between characters |
| `staggerFrom`       | `'first' \| 'last' \| 'center' \| 'random' \| number` | `'first'`      | Direction to stagger from              |
| `loop`              | `boolean`                                             | `true`         | Whether to loop back to start          |
| `auto`              | `boolean`                                             | `true`         | Auto-rotate texts                      |
| `splitBy`           | `'characters' \| 'words' \| 'lines' \| string`        | `'characters'` | How to split the text                  |
| `animationDuration` | `number`                                              | `300`          | Animation duration in ms               |
| `animationEasing`   | `string`                                              | `'ease-out'`   | CSS easing function                    |

## Methods

Access via template reference:

```html
<flaux-rotating-text #rotatingText [texts]="myTexts"></flaux-rotating-text>
<button (click)="rotatingText.next()">Next</button>
<button (click)="rotatingText.previous()">Previous</button>
<button (click)="rotatingText.jumpTo(2)">Jump to index 2</button>
<button (click)="rotatingText.reset()">Reset</button>
```

- `next()` - Go to next text
- `previous()` - Go to previous text  
- `jumpTo(index: number)` - Jump to specific index
- `reset()` - Reset to first text

## Styling

Apply custom classes to the host element:

```html
<flaux-rotating-text 
  class="px-2 bg-cyan-300 text-black rounded-lg"
  [texts]="myTexts">
</flaux-rotating-text>
```

## Example with Custom Styling

```html
<flaux-rotating-text
  class="text-4xl font-bold"
  [texts]="['Build', 'Ship', 'Scale']"
  [staggerFrom]="'center'"
  [staggerDuration]="50"
  [splitBy]="'characters'"
  [rotationInterval]="3000">
</flaux-rotating-text>
```

```scss
flaux-rotating-text {
  &.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  
  &.font-bold {
    font-weight: 700;
  }
}
```
