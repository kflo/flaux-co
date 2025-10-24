import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";

@Component({
	selector: 'ai-solutions-industries-section',
	imports: [FlauxSectionComponent],
	templateUrl: './ai-solutions-industries-section.component.html',
	styleUrl: './ai-solutions-industries-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsIndustriesSection {
	industries = [
		{
			name: 'Healthcare',
			description: 'AI-powered diagnostics, patient management, and medical imaging solutions.',
			icon: 'healthcare',
			useCases: ['Medical Imaging Analysis', 'Patient Risk Assessment', 'Drug Discovery', 'Treatment Optimization']
		},
		{
			name: 'Finance & Banking',
			description: 'Fraud detection, algorithmic trading, and personalized financial services.',
			icon: 'finance',
			useCases: ['Fraud Detection', 'Credit Scoring', 'Algorithmic Trading', 'Customer Analytics']
		},
		{
			name: 'Retail & E-commerce',
			description: 'Personalized recommendations, inventory management, and customer insights.',
			icon: 'retail',
			useCases: ['Recommendation Systems', 'Price Optimization', 'Demand Forecasting', 'Customer Segmentation']
		},
		{
			name: 'Manufacturing',
			description: 'Predictive maintenance, quality control, and supply chain optimization.',
			icon: 'manufacturing',
			useCases: ['Predictive Maintenance', 'Quality Inspection', 'Process Optimization', 'Supply Chain Analytics']
		},
		{
			name: 'Transportation',
			description: 'Route optimization, autonomous systems, and logistics management.',
			icon: 'transportation',
			useCases: ['Route Optimization', 'Fleet Management', 'Autonomous Navigation', 'Traffic Analysis']
		},
		{
			name: 'Energy & Utilities',
			description: 'Smart grid management, energy forecasting, and sustainability optimization.',
			icon: 'energy',
			useCases: ['Smart Grid Analytics', 'Energy Forecasting', 'Consumption Optimization', 'Renewable Integration']
		}
	];
}
