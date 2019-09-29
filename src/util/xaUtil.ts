export const createXaUtil = (d: Document) => {
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

   let intoTextNode = (child: Node | string) => {
      let node: Node
      if (typeof child === 'string') {
         node = d.createTextNode(child)
      } else {
         node = child
      }
      return node
   }

   let xaUtil = {
      create,
      intoTextNode,
   }

   return xaUtil
}

export type XaUtil = ReturnType<typeof createXaUtil>
