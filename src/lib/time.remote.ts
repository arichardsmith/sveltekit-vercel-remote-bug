import { query } from '$app/server';

export const get_time = query(() => {
	return new Date().toISOString();
});
