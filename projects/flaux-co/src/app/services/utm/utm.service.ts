import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BrowserStorage } from './utm.storage';
import { UtmStored, UtmParams, UTM_KEYS } from './utm.model';

@Injectable({ providedIn: 'root' })

export class UtmService {
	private readonly storageKey = 'flaux:utm:v1';
	private readonly ttlMs: number | null = 1000 * 60 * 60 * 24 * 30; // 30d; set null to disable

	private storage = inject(BrowserStorage);

	/** Call whenever navigation happens; pass router's queryParams. */
	captureFromQueryParams(query: Params): void {
		this.purgeIfExpired();

		const incoming = this.extractFromQuery(query);
		const hasIncoming = this.hasAnyUtm(incoming);

		if (!hasIncoming) return; // No UTMs in URL → keep what we already have

		const now = Date.now();
		const existing = this.readStored();

		const next: UtmStored = {
			utm: incoming,
			firstSeenAt: existing?.firstSeenAt ?? now,
			lastSeenAt: now,
		};

		this.writeStored(next);
	}

	getUtm(): UtmParams {
		this.purgeIfExpired();
		return this.readStored()?.utm ?? {};
	}

	/** Attach UTMs to any payload (recommended: nest under `utm`). */
	withUtm<T extends Record<string, any>>(payload: T): T & { utm: UtmParams } {
		return {
			...payload, utm: this.getUtm()
		};
	}

	clear(): void {
		this.storage.removeItem(this.storageKey);
	}

	/* -------------------------------------------------------------------------- */
	/*                                  INTERNALS                                 */
	/* -------------------------------------------------------------------------- */

	private extractFromQuery(query: Params): UtmParams {
		const out: UtmParams = {};
		for (const key of UTM_KEYS) {
			const val = query[key];
			if (typeof val === 'string' && val.trim()) {
				out[key] = this.normalize(val);
			}
		}
		return out;
	}

	private normalize(value: string): string {
		// Enforce Flaux convention: lowercase + snake_case (best-effort)
		return value.trim().toLowerCase().replace(/\s+/g, '_');
	}

	private hasAnyUtm(utm: UtmParams): boolean {
		return UTM_KEYS.some((k) => Boolean(utm[k]));
	}

	private readStored(): UtmStored | null {
		const raw = this.storage.getItem(this.storageKey);
		if (!raw) return null;
		try {
			return JSON.parse(raw) as UtmStored;
		} catch {
			return null;
		}
	}

	private writeStored(data: UtmStored): void {
		this.storage.setItem(this.storageKey, JSON.stringify(data));
	}

	private purgeIfExpired(): void {
		if (this.ttlMs == null) return;
		const stored = this.readStored();
		if (!stored) return;

		if (Date.now() - stored.lastSeenAt > this.ttlMs) {
			this.clear();
		}
	}
}
