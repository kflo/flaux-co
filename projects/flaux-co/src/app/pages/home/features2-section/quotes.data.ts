// Extracted quotes data for Features2SectionComponent
// Keeping this in its own module improves readability and allows potential reuse / lazy-loading later.

export interface QuoteItem {
	quoteStart: string;
	highlight: string;
	quoteEnd: string;
	source: string;
}

export const QUOTES: ReadonlyArray<QuoteItem> = [
	{
		quoteStart: 'Businesses with a 4+ star rating',
		highlight: 'earn 28% more',
		quoteEnd: 'in annual revenue than those who don’t',
		source: 'Womply'
	},
	{
		quoteStart: 'AI Receptionist tools cut response times from 24–48 hours to under 30 seconds, resulting in',
		highlight: ' a 70% ROI boost',
		quoteEnd: '',
		source: 'Live360 Marketing'
	},
	{
		quoteStart: 'Capture hundreds of qualified leads in months: partners using AI-powered receptionist tools have generated',
		highlight: ' 700+ high-quality leads in just 4 months',
		quoteEnd: '',
		source: 'Elite Web Pros'
	},
	{
		quoteStart: 'Clients using our SMS Business App see',
		highlight: '3× more engagement',
		quoteEnd: 'compared to those without',
		source: 'Flaux Research'
	},
	{
		quoteStart: '23% of small businesses have adopted AI -- ',
		highlight: '82% report increased efficiency',
		quoteEnd: ' from its use',
		source: 'bigsur.ai'
	},
	{
		quoteStart: 'AI utilization among SMBs results in a ',
		highlight: '91% revenue boost, 86% improved profits,',
		quoteEnd: ' and operational scaling',
		source: 'Vendasta Research'
	},
	{
		quoteStart: 'Partners embracing AI have seen a ',
		highlight: '372% increase',
		quoteEnd: ' in lead-to-revenue conversion',
		source: 'Vendasta Research'
	},
	{
		quoteStart: 'We replaced a 47-step project tracking system with a 5-item daily checklist. Project completion rate ',
		highlight: 'doubled in 60 days',
		quoteEnd: '.',
		source: 'Becket Sterba, Monk AI Group'
	},
	{
		quoteStart: 'A $10M company was tracking 38 metrics. We cut it to 3 core metrics and found a ',
		highlight: '$200K/year leak',
		quoteEnd: ' in week one.',
		source: 'Becket Sterba, Monk AI Group'
	},
	{
		quoteStart: 'Companies that have successfully scaled AI have seen profit margins increase by ',
		highlight: '3 to 15 percentage points',
		quoteEnd: '.',
		source: 'McKinsey'
	},
	{
		quoteStart: 'Using AI for lead scoring can increase the number of qualified leads by ',
		highlight: 'over 50%',
		quoteEnd: '.',
		source: 'Harvard Business Review'
	},
	{
		quoteStart: 'Implementing AI in customer service can reduce inquiry handling times by up to ',
		highlight: '70%',
		quoteEnd: '.',
		source: 'Gartner'
	},
	{
		quoteStart: 'By 2026, over ',
		highlight: '80% of enterprises',
		quoteEnd: ' will have deployed GenAI in production, a huge leap from less than 5% in 2023.',
		source: 'Gartner'
	},
	{
		quoteStart: '',
		highlight: '94% of business leaders',
		quoteEnd: ' agree that AI is critical to their success over the next five years.',
		source: 'Deloitte'
	},
	{
		quoteStart: 'Netflix estimates its AI-powered recommendation engine prevents subscription cancellations worth over ',
		highlight: '$1 billion per year',
		quoteEnd: '.',
		source: 'Netflix'
	},
	{
		quoteStart: 'According to a global study, the #1 use case for AI in enterprise today is ',
		highlight: 'automating labor and workflows',
		quoteEnd: ', cited by 46% of companies.',
		source: 'IBM'
	},
];
