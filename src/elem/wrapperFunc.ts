import { Xa, XaElement } from '../xa'

export interface WrapperFunc<T> {
   $: <R extends Element>(selector: string) => XaElement<R> | undefined
   $$: <R extends Element>(selector: string) => XaElement<R>[]
   append: <T extends Node | string>(child: T) => T
   clone: (deep: boolean) => T
   on: <K extends keyof ElementEventMap>(
      type: K,
      listener: (this: Element, ev: ElementEventMap[K]) => any,
      option?: boolean | AddEventListenerOptions,
   ) => { remove: () => void }
}

export const wrapperFunc = <T extends Element>(
   el: T,
   xa: Xa,
): WrapperFunc<T> => {
   let wrapperFunc: WrapperFunc<T> = {
      $: <R extends Element>(selector: string): XaElement<R> | undefined => {
         let result = el.querySelector<R>(selector)
         return result !== null ? xa.wrap(result) : undefined
      },
      $$: <R extends Element>(selector: string): XaElement<R>[] => {
         return Array.from(el.querySelectorAll<R>(selector)).map(xa.wrap)
      },
      append: <T extends Node | string>(child: T): T => {
         el.appendChild(xa.intoTextNode(child))
         return child
      },
      clone: (deep: boolean): T => xa.wrap(el.cloneNode(deep) as T),
      on: <K extends keyof ElementEventMap>(
         type: K,
         listener: (this: Element, ev: ElementEventMap[K]) => any,
         option?: boolean | AddEventListenerOptions,
      ) => {
         el.addEventListener(type, listener, option)
         let remove = () => {
            el.removeEventListener(type, listener, option)
         }
         return { remove }
      },
   }
   return wrapperFunc
}
