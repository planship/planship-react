import { useContext } from 'react'

import context, { type IPlanshipContext } from './context'

const usePlanship = () => {
  return useContext<IPlanshipContext>(context)
}

export { usePlanship }
