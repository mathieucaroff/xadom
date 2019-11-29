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

## Documentation

`xadom` exports a single function `createXa`, and most notable the types `Xa` and `XaElement<T>`.

## createXa

Create an `Xa` instance.

```ts
createXa: (prop: { document: Document }): Xa
```

```ts
let xa = createXa({ document })
```

## Xa instance

```ts
interface Xa extends Document {
  create: <K ...>(
    name: K,
    attribute: Record<string, string> = {},
    children: Element[] = []
  ): HTMLElement
  intoTextNode: (child: Node | string) => Node
  wrap: (el: Element) => XaElement<ELement>

  body: XaElement<HTMLElement>
  head: XaElement<HTMLHeadElement>
  html: XaElement<HTMLElement>
}
```

`create` allows to quickly create an Html element with properties assigned:

- `name` is the Html element name
- `attribute` (defaults to `{}`) is a record of key-values to set onto the newly created element. If the keys are found in the element, they are set directly on the object. If they are not found though, they are set using `setAttribute`.
- `children` (defaults to `[]`) is an array of children to be appended to the element. A child can be any Node (including Elements), or a string. In the latter case, the string will be use to make a text node which will be inserted.

```ts
let el = xa.create('div', {}, [
  xa.create('span', {}, [
    'Mathematics allows for no hypocrisy and no vagueness.',
  ]),
  xa.create('p', {
    textContent: 'Sometimes in life, random things can blind-side you.',
  }),
  xa.create('span', {
    innerText: `
    As far as the laws of mathematics refer to reality, they are not
    certain, and as far as they are certain, they do not refer to reality.
    `,
  }),
])
```

`wrap` returns an Xa-enabled, wrapped version of the given Element. See XaElement.

```ts
let el = xa.wrap(xa.body.$('#main').firstNode as Element)
```

`xa.body`, `xa.head`, and `xa.html` are wrapped versions of `document.body`, `document.head` and `document.documentElement`.

**`xa` inherits from `document`**. All properties available on `document` are
also available on `xa`.

## XaElement

An `XaElement<T>` instances, obtained via `xa.wrap`, has all the properties of its original element `T`, plus the following properties:

- `el.count` gives the number of children
- `el.first` gives the first child element (wrapped), or `undefined`
- `el.last` gives the last child element (wrapped), or `undefined`
- `el.firstNode` gives the first node, just like `el.firstChild`, thought it defaults to `undefined` rather than `null`.
- `el.lastNode` gives the first node, just like `el.firstChild`, thought it defaults to `undefined` rather than `null`.
- `el.nodes`, with a performance cost, returns the array of the children elements
- `el.firstT<T extends Element>()` and `el.lastT<T extends Element>()` are typescript helper functions which allow to specify the expected type of the element. This type is used in place of Element to parameter the return type `XaElement<T>`.

Function:

- `el.$` is a synonyme of `document.querySelector`
- `el.$$` is a synonyme of `document.querySelectorAll`
- `el.append` accepts a node or a child and append it to the children of the element
- `el.clone` is a synonyme of `el.cloneNode`
- `el.on` is a synonyme of `el.addEventListener`, except it return an object
  which contains a `remove` function which removes the event listener

Note: all functions which return an element object return it wrapped
