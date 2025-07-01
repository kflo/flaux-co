import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('@pages/home/home.page').then(m => m.FlauxHomePage) },
  { path: 'solutions', loadComponent: () => import('@pages/solutions/solutions.page').then(m => m.SolutionsPage) },
  { path: 'demo', loadComponent: () => import('@pages/demo/demo.page').then(m => m.DemoPage) },
  { path: 'pricing', loadComponent: () => import('@pages/pricing/pricing.page').then(m => m.PricingPage) },
  { path: 'blog', loadComponent: () => import('@pages/blog/blog.page').then(m => m.BlogPage) },
  { path: 'about', loadComponent: () => import('@pages/about/about.page').then(m => m.AboutPage) },
  { path: 'contact', loadComponent: () => import('@pages/contact/contact.page').then(m => m.ContactPage) },
  { path: 'login', loadComponent: () => import('@pages/login/login.page').then(m => m.LoginPage) },
  { path: 'signup', loadComponent: () => import('@pages/signup/signup.page').then(m => m.SignupPage) },
  { path: 'reset-password', loadComponent: () => import('@pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage) },
  { path: 'checkout', loadComponent: () => import('@pages/checkout/checkout.page').then(m => m.CheckoutPage) },
  { path: 'dashboard', loadComponent: () => import('@pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
];
