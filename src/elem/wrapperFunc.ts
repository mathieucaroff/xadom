import { XaFuture } from '../future'
import { Xa, XaElement } from '../xa'

/**
 * See the README file for documentation
 */
export interface WrapperFunc<T extends Element> {
   $: <R extends Element>(selector: string) => XaElement<R> | undefined
   $$: <R extends Element>(selector: string) => XaElement<R>[]
   append: <TN extends Node>(child: TN) => XaElement<T>
   appendText: (text: string) => XaElement<T>
   clone: (deep: boolean) => XaElement<T>
   on: <K extends keyof ElementEventMap>(
      type: K,
      listener: (this: Element, ev: ElementEventMap[K]) => any,
      option?: boolean | AddEventListenerOptions,
   ) => { remove: () => void }
}

/**
 *
 * @param el The element to wrap
 * @param xa The xa instance. It is used to wrap children elements when read
 *
 * @returns An object containing the methods provided by the wrapper
 */
export const wrapperFunc = <T extends Element>(
   el: T,
   xa: Xa,
   future: XaFuture<T>,
): WrapperFunc<T> => {
   let elWrapperFunc: WrapperFunc<T> = {
      $: <R extends Element>(selector: string): XaElement<R> | undefined => {
         let result = el.querySelector<R>(selector)
         return result !== null ? xa.wrap(result) : undefined
      },

      $$: <R extends Element>(selector: string): XaElement<R>[] => {
         return Array.from(el.querySelectorAll<R>(selector)).map(xa.wrap)
      },

      append: <TN extends Node>(child: TN): XaElement<T> => {
         el.appendChild(child)
         return future.self
      },

      appendText: (text: string): XaElement<T> => {
         el.appendChild(xa.createTextNode(text))
         return future.self
      },

      clone: (deep: boolean): XaElement<T> => xa.wrap(el.cloneNode(deep) as T),

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

   return elWrapperFunc
}
