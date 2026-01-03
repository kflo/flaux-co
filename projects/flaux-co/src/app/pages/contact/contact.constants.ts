export const INITIAL_FORM_VALUES = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	prefersEmail: false,
	prefersPhone: false,
	prefersSms: false,
	company: '',
	projectType: [] as string[],
	budgetIndex: 0,
	timelineIndex: 0,
	description: '',
	setAppointment: false
};

export const PROJECT_TYPE_GROUPS = [
	{
		label: 'FLAUX AI',
		options: [
			'AI Chat Agent',
			'AI Education & Training',
			'AI Strategy & Consulting',
			'AI Voice Agent',
			'Automation & Integrations',
			'Marketing & Lead Generation',
			'Other'
		]
	},
	{
		label: 'FLAUX AGENCY',
		options: [
			'Branding & Identity',
			'Content Creation',
			'Digital Marketing, Ads, SEO',
			'Social Media Management',
			'Reputation Management',
			'CRM (Customer Relationship Management)',
			'Communication (SMS, Email, etc)',
			'AI Workforce (Receptionist, etc)',
			'Website Design & Development',
			'Other'
		]
	}
];

export const BUDGET_SLIDER_LABELS = [
	'TBD',
	'< $1k',
	'$1k - $5k',
	'$5k - $10k',
	'$10k - $25k',
	'$25k - $50k',
	'$50k - $100k',
	'$100k - $250k',
	'$250k+',
];

export const TIMELINE_SLIDER_LABELS = [
	'ASAP',
	'1-4 weeks',
	'1-3 months',
	'3-6 months',
	'6-12 months',
	'12+ months',
	'Flexible'
];
