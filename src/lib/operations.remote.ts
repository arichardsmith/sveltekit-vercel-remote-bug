import { query } from '$app/server';
import z from 'zod';

export const add = query(z.array(z.number()).min(2), (args) => {
	return args[0] + args[1];
});

export const sub = query(z.array(z.number()).min(2), (args) => {
	return args[0] - args[1];
});

export const sqrt = query(z.array(z.number()).min(1), (args) => {
	return Math.sqrt(args[0]);
});
