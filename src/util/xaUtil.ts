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
   let create = <K extends keyof HTMLElementTagNameMap>(
      name: K,
      attribute: Partial<HTMLElementTagNameMap[K]> & Record<string, any> = {},
      children: Element[] = [],
   ) => {
      // Create element
      let elem = d.createElement<K>(name)

      // Copy each attribute
      Object.entries(attribute).forEach(([name, value]) => {
         if (elem[name] !== undefined) {
            elem[name] = value
         } else {
            if (typeof value !== 'string') {
               console.warn(
                  `hyper: met unexpected attribute ${name}`,
                  value,
                  new Error().stack,
               )
            }
            elem.setAttribute(name, value)
         }
      })

      // Insert each child
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
