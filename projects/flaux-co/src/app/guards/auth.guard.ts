import {inject} from '@angular/core';
import {Router, CanActivateFn} from '@angular/router';
import {AuthService} from '@app/services/auth.service';

/**
 * Guard to protect routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.user()) {
        return true;
    }

    return router.createUrlTree(['/login']);
};

/**
 * Guard to prevent authenticated users from accessing login/signup pages
 * Redirects to /dashboard if user is already authenticated
 */
export const guestGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.user()) {
        return true;
    }

    return router.createUrlTree(['/dashboard']);
};
