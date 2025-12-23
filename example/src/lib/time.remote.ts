import { query } from '$app/server';
import z from 'zod';

// We need a parameter here to show that payload is also being cached
export const get_time = query(z.string(), (id) => {
	return new Date().toISOString();
});
