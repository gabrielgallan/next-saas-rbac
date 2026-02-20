import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: [
    '@saas/auth', 
    '@saas/env',
    '@saas/core'
  ],

  dts: false
})