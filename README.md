# Repro for Remote Function Bug On Vercel

This repo provides a minimal reproduction showing how ISR settings on a rest parameter route prevent remote functions from receiving their arguments.

If you run this locally, or in a staging environment on Vercel then it works. However, the production deploy on vercel results in any calculation returning a `Bad Request` error. The server logs will show:
```
Remote function schema validation failed: [
  {
    expected: 'array',
    code: 'invalid_type',
    path: [],
    message: 'Invalid input: expected array, received undefined'
  }
]
```

## The Problem

Remote functions create endpoints at the following route `/_app/remote/[id]/[function]?payload={encoded arguments}`. If you have a rest parameter route (i.e., `/[...rest]`) that matches all routes, then the function built to handle this route is the one that handles the remote function calls.

The catch is, if you set an ISR config for that route, then Vercel strips out any query parameters that aren't explicitly allowed in the configuration—which includes the `payload` parameter used to pass remote function arguments.

## Preview

I've got [a copy deployed on Vercel](https://sveltekit-vercel-remote-bug.vercel.app/) to confirm. There's also a [preview deployment](https://sveltekit-vercel-remote-bug-git-d814d4-richardmcsmiths-projects.vercel.app?_vercel_share=1xb2PlkDCfakvvT4PbuILnTIBfuoDWy2) that works as the payload parameter is explicitly allowed.
