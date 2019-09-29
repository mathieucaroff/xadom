import { createXa } from './xa'

let exp = window as any

exp.createXa = createXa
exp.xa = createXa({ document })
