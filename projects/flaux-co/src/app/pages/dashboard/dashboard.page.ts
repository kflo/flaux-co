import {Component, inject} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
	selector: 'flaux-dashboard',
	standalone: true,
	imports: [MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule],
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
	authService = inject(AuthService);

	getAvatarUrl(): string {
		const userId = this.authService.user()?.uid || 'default';
		// Change 'avataaars' to any style: bottts, lorelei, personas, pixel-art, adventurer, fun-emoji, etc.
		return `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`;
	}

	logout() {
		this.authService.logout();
	}
}
