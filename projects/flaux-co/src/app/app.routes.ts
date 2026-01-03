import { Routes } from '@angular/router';
// import {authGuard, guestGuard} from '@app/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('@pages/home/home-page.component').then(m => m.FlauxHomePageComponent)
	},
	{
		path: 'solutions',
		children: [
			{
				path: 'agency',
				loadComponent: () => import('@app/pages/solutions/agency-solutions/agency-solutions-page.component').then(m => m.AgencySolutionsPageComponent)
			},
			{
				path: 'ai',
				loadComponent: () => import('@app/pages/solutions/ai-solutions/ai-solutions-page.component').then(m => m.AiSolutionsPageComponent)
			},
			{
				path: '**',
				redirectTo: '/'
			}
		]
	},
	{
		path: 'demo',
		loadComponent: () => import('@pages/demo/demo.page').then(m => m.DemoPage)
	},
	{
		path: 'laser-flow-demo',
		loadComponent: () => import('@pages/laser-flow-demo/laser-flow-demo.component').then(m => m.LaserFlowDemoComponent)
	},
	{
		path: 'pricing',
		loadComponent: () => import('@pages/pricing/pricing.page').then(m => m.PricingPage)
	},
	{
		path: 'blog',
		loadComponent: () => import('@pages/blog/blog.page').then(m => m.BlogPage)
	},
	{
		path: 'about',
		loadComponent: () => import('@pages/about/about.page').then(m => m.AboutPage)
	},
	{
		path: 'contact',
		loadComponent: () => import('@pages/contact/contact.page').then(m => m.ContactPage)
	},
	{
		path: 'submitted',
		loadComponent: () => import('@pages/thank-you/thank-you.page').then(m => m.ThankYouPage)
	},
	{
		path: 'login',
		// canActivate: [guestGuard],
		loadComponent: () => import('@pages/login/login.page').then(m => m.LoginPage)
	},
	{
		path: 'signup',
		// canActivate: [guestGuard],
		loadComponent: () => import('@pages/signup/signup.page').then(m => m.SignupPage)
	},
	{
		path: 'reset-password',
		loadComponent: () => import('@pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage)
	},
	{
		path: 'checkout',
		loadComponent: () => import('@pages/checkout/checkout.page').then(m => m.CheckoutPage)
	},
	{
		path: 'dashboard',
		// canActivate: [authGuard],
		loadComponent: () => import('@pages/dashboard/dashboard.page').then(m => m.DashboardPage)
	},
	{
		path: 'hvac-audit',
		loadComponent: () => import('@pages/funnels/hvac-audit/hvac-audit.page').then(m => m.HvacAuditPage)
	},
	{
		path: 'plumbing-audit',
		loadComponent: () => import('@pages/funnels/plumbing-audit/plumbing-audit.page').then(m => m.PlumbingAuditPage)
	},
	{
		path: 'workflow-automation',
		loadComponent: () => import('@pages/funnels/workflow-automation/workflow-automation.page').then(m => m.WorkflowAutomationPage)
	},
	{
		path: 'sms-consent-policy',
		loadComponent: () => import('@pages/sms-consent-policy/sms-consent-policy.component').then(m => m.SmsConsentPolicyComponent)
	},
];
