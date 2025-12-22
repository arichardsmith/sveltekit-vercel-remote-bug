import type { Config } from '@sveltejs/adapter-vercel';

// This ISR config also applies to the remote function called at /_app/remote/{id}/{function}
export const config: Config = {
	isr: {
		expiration: 60
		// Explicitly allowing the payload param makes the remote function call work correctly
		// allowQuery: ['payload']
	}
};
