/**
 * xa.ts
 *
 * entry point for libraries
 */

import { WrapperFunc, wrapperFunc } from './elem/wrapperFunc'
import { WrapperProp, wrapperProp } from './elem/wrapperProp'
import { createXaUtil, XaUtil } from './util/xaUtil'
import { XaFuture } from './future'

export interface XaProp {
   document: Document
}

export type XaElement<T extends Element> = T &
   WrapperProp &
   WrapperFunc<T> & {
      _: T
   }

export type Xa = XaUtil &
   Document & {
      wrap: <T extends Element>(el: T) => XaElement<T>
   } & {
      body: XaElement<HTMLElement>
      head: XaElement<HTMLHeadElement>
      html: XaElement<HTMLElement>
   }

/**
 *
 * @param prop.document The document instance of the page
 * @returns An Xa instance, wrapping the document
 */
export const createXa = (prop: XaProp): Xa => {
   let { document: doc } = prop

   let xaUtil = createXaUtil(doc)

   let wrap = <T extends Element>(el: T): XaElement<T> => {
      if ('$' in el) {
         return el as XaElement<T>
      }

      let future: XaFuture<T> = {
         get self() {
            return wrappedElement
         },
      }

      let elWrapperProp = wrapperProp(el, xa)
      let elWrapperFunc = wrapperFunc(el, xa, future)

      let wrappedElement: XaElement<T> = Object.setPrototypeOf(
         {
            ...elWrapperFunc,
            ...elWrapperProp,
            _: el,
         },
         el,
      )

      return wrappedElement
   }

   let xa: Xa = Object.setPrototypeOf(
      {
         get body() {
            return wrap(doc.body)
         },
         get html() {
            return wrap(doc.documentElement)
         },
         get head() {
            return wrap(doc.head)
         },
         ...xaUtil,

         // Wrapper
         wrap,
      },
      document,
   )

   return xa
}
