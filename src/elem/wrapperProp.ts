import { Xa, XaElement } from '../xa'

export type WrapperProp = {
   count: number
   first?: XaElement<Element>
   last?: XaElement<Element>
   firstNode?: Node
   lastNode?: Node
   nodes: Node[]
}

export const wrapperProp = <T extends Element>(el: T, xa: Xa): WrapperProp => {
   let xaProp = {
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
      get last() {
         let res = el.lastElementChild
         return res !== null ? xa.wrap(res) : undefined
      },
      get lastNode() {
         return el.lastChild || undefined
      },
      get nodes() {
         return Array.from(el.childNodes)
      },
   }
   return xaProp
}
