import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	isr: {
		expiration: 60,
		// Explicitly allowing the payload param makes the remote function call work correctly
		allowQuery: ['payload']
	}
};
