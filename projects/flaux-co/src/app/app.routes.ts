import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '',
		pathMatch: 'full',
		loadComponent: () => import('@pages/home/home-page.component').then(m => m.FlauxHomePageComponent) },
	{ path: 'solutions',
		children: [
			{ path: 'agency',
				loadComponent: () => import('@app/pages/solutions/agency-solutions/agency-solutions-page.component').then(m => m.AgencySolutionsPageComponent) },
			{ path: 'ai',
				loadComponent: () => import('@app/pages/solutions/ai-solutions/ai-solutions-page.component').then(m => m.AiSolutionsPageComponent) },
			{
				path: '**',
				redirectTo: '/'
			}
		]},
	{ path: 'demo',
		loadComponent: () => import('@pages/demo/demo.page').then(m => m.DemoPage) },
	{ path: 'laser-flow-demo',
		loadComponent: () => import('@pages/laser-flow-demo/laser-flow-demo.component').then(m => m.LaserFlowDemoComponent) },
	{ path: 'pricing',
		loadComponent: () => import('@pages/pricing/pricing.page').then(m => m.PricingPage) },
	{ path: 'blog',
		loadComponent: () => import('@pages/blog/blog.page').then(m => m.BlogPage) },
	{ path: 'about',
		loadComponent: () => import('@pages/about/about.page').then(m => m.AboutPage) },
	{ path: 'contact',
		loadComponent: () => import('@pages/contact/contact.page').then(m => m.ContactPage) },
	{ path: 'login',
		loadComponent: () => import('@pages/login/login.page').then(m => m.LoginPage) },
	{ path: 'signup',
		loadComponent: () => import('@pages/signup/signup.page').then(m => m.SignupPage) },
	{ path: 'reset-password',
		loadComponent: () => import('@pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage) },
	{ path: 'checkout',
		loadComponent: () => import('@pages/checkout/checkout.page').then(m => m.CheckoutPage) },
	{ path: 'dashboard',
		loadComponent: () => import('@pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
];
