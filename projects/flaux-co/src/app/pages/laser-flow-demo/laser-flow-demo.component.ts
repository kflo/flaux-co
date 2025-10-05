import { Component } from '@angular/core';
import { LaserFlowComponent } from '../../shared/laser-flow/laser-flow.component';

@Component({
	selector: 'app-laser-flow-demo',
	template: `
	<div class="demo-container">
		<h1>LaserFlow Component Demo</h1>

		<div class="demo-section">
			<h2>Default LaserFlow</h2>
			<div class="laser-container">
				<app-laser-flow></app-laser-flow>
			</div>
		</div>

		<div class="demo-section">
			<h2>Customized LaserFlow</h2>
			<div class="laser-container">
				<app-laser-flow
					[color]="'#00ff00'"
					[wispDensity]="1.5"
					[flowSpeed]="0.5"
					[fogIntensity]="0.6">
				</app-laser-flow>
			</div>
		</div>

		<div class="demo-section">
			<h2>Purple LaserFlow</h2>
			<div class="laser-container">
				<app-laser-flow
					[color]="'#9d4edd'"
					[verticalSizing]="1.5"
					[horizontalSizing]="0.8"
					[wispIntensity]="7.0">
				</app-laser-flow>
			</div>
		</div>


	</div>
	`,
	styleUrls: ['./laser-flow-demo.component.scss'],
	standalone: true,
	imports: [LaserFlowComponent]
})
export class LaserFlowDemoComponent { }
