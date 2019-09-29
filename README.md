# Xadom

A small DOM Element wrapper library, made to be used in Typescript project.

```ts
import { createXa } from 'xadom'

let xa = createXa({ dom })

let linkText = xa.body
   .$$('a')
   .map((a) => a.href)
   .join('\n')

console.log(linkText)
```

## License

This code is available under CC0 License (public domain).
