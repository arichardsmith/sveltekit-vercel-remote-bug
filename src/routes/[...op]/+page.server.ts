import type { Config } from '@sveltejs/adapter-vercel';

// This ISR config applies to all routes as it's for a root level catch all page
export const config: Config = {
	isr: {
		expiration: 60
		// Explicitly allowing the payload param makes the remote function call work correctly
		// allowQuery: ['payload']
	}
};
