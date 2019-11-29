import { Xa, XaElement } from '../xa'

/**
 * See the README file for documentation
 */
export type WrapperProp = {
   count: number
   first?: XaElement<Element>
   last?: XaElement<Element>
   firstT<T extends Element>(): XaElement<T> | undefined
   lastT<T extends Element>(): XaElement<T> | undefined
   firstNode?: Node
   lastNode?: Node
   nodes: Node[]
}

/**
 *
 * @param el The element to wrap
 * @param xa The xa instance. It is used to wrap children elements when read
 *
 * @returns An object containing the properties provided by the wrapper
 */
export const wrapperProp = <T extends Element>(el: T, xa: Xa): WrapperProp => {
   let elWrapperProp: WrapperProp = {
      get count() {
         return el.childElementCount
      },
      get first() {
         let res = el.firstElementChild
         return res !== null ? xa.wrap(res) : undefined
      },
      get firstNode() {
         return el.firstChild || undefined
      },
      firstT<T extends Element>() {
         return elWrapperProp.first as XaElement<T> | undefined
      },
      get last() {
         let res = el.lastElementChild
         return res !== null ? xa.wrap(res) : undefined
      },
      get lastNode() {
         return el.lastChild || undefined
      },
      lastT<T extends Element>() {
         return elWrapperProp.last as XaElement<T> | undefined
      },
      get nodes() {
         return Array.from(el.childNodes)
      },
   }
   return elWrapperProp
}
