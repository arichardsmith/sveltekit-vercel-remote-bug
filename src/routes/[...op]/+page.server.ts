import type { Config } from '@sveltejs/adapter-vercel';

// This ISR config applies to all routes as it's in a root level catch all
export const config: Config = {
	isr: {
		expiration: 60
	}
};
