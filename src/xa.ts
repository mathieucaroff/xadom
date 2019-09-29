import { WrapperFunc, wrapperFunc } from './elem/wrapperFunc'
import { WrapperProp, wrapperProp } from './elem/wrapperProp'
import { createXaUtil, XaUtil } from './util/xaUtil'

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

export const createXa = (prop: XaProp): Xa => {
   let { document: d } = prop

   let xaUtil = createXaUtil(d)

   let wrap = <T extends Element>(el: T): XaElement<T> => {
      if ('$' in el) {
         return el as any
      }

      let elWrapperProp = wrapperProp(el, xa)
      let elWrapperFunc = wrapperFunc(el, xa)

      return Object.setPrototypeOf(
         {
            ...elWrapperFunc,
            ...elWrapperProp,
            _: el,
         },
         el,
      )
   }

   let xa: Xa = Object.setPrototypeOf(
      {
         get body() {
            return wrap(d.body)
         },
         get html() {
            return wrap(d.documentElement)
         },
         get head() {
            return wrap(d.head)
         },
         ...xaUtil,

         // Wrapper
         wrap,
      },
      document,
   )

   return xa
}
