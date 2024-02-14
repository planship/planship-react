import { useContext } from 'react'

import context, { IPlanshipContext } from './context'

const usePlanship = () => {
  return useContext<IPlanshipContext>(context)
}

export { usePlanship }
