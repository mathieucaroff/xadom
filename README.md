# Xadom

A small DOM Element wrapper library, made to be used in Typescript project.

```ts
import { createXa } from 'xadom'

let xa = createXa({ document })

let linkText = xa.body
  .$$('a')
  .map((a) => a.href)
  .join('\n')

console.log(linkText)
```

## Bundling

- `src/lib.ts` expects a browser environment and exports `xa` and `createXa` to the `window`
- `src/xa.ts` is the module version of the library.

Bundling to a single file `dist/lib.js`:

- Minified bundle: `yarn parcel build src/lib.ts`
- Readable bundle: `yarn parcel src/lib.ts`

Compiling each source file to `dist`, for use of `dist/xa.js` as a module:

- `yarn tsc src/xa.ts`

## Publishing

- `yarn tsc src/xa.ts`

## License

This code is available under CC0 License (public domain).
