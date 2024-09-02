import { useContext } from 'react'

import context, { type IPlanshipContext } from './context.js'

const usePlanship = () => {
  return useContext<IPlanshipContext>(context)
}

export { usePlanship }
