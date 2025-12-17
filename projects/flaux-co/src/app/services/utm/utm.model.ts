export type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export interface UtmStored {
  utm: UtmParams;
  firstSeenAt: number; // ms epoch
  lastSeenAt: number;  // ms epoch
}

export const UTM_KEYS: UtmKey[] = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
];
