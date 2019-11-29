/**
 * xaUtil.ts
 *
 * Utilitary functions provided to the user
 */

export const createXaUtil = (d: Document) => {
   /**
    * create an HTML Element
    *
    * @param name The html name of the element to create
    * @param attribute An object associating keys to values for the created element
    * @param children An array of children elements
    */
   let create = <
      K extends keyof (HTMLElementTagNameMap | SVGElementTagNameMap)
   >(
      name: K,
      attribute: Record<string, string> = {},
      children: Element[] = [],
   ) => {
      let elem = d.createElement<K>(name as K)

      Object.entries(attribute).forEach(([name, value]) => {
         if (elem[name] !== undefined) {
            elem[name] = value
         } else {
            elem.setAttribute(name, value)
         }
      })

      children.forEach((child) => {
         elem.appendChild(child)
      })

      return elem
   }

   let xaUtil = {
      create,
   }

   return xaUtil
}

export type XaUtil = ReturnType<typeof createXaUtil>
