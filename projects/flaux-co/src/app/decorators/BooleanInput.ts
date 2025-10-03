// import { coerceBooleanProperty } from '@angular/cdk/coercion';

// export function BooleanInput(): PropertyDecorator {
// 	return (target: any, propertyKey: string | symbol) => {
// 		const key = Symbol();

// 		Object.defineProperty(target, propertyKey, {
// 			get(): boolean {
// 				return this[key] || false;
// 			},
// 			set(value: boolean | string) {
// 				this[key] = coerceBooleanProperty(value);
// 			},
// 			enumerable: true,
// 			configurable: true
// 		});
// 	};
// }
