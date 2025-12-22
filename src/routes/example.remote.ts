import { z } from 'zod';

import { query } from '$app/server';

export const capitalise = query(z.string(), (input) => {
	return input.toUpperCase();
});
