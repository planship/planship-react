import { useContext } from 'react'

import context, { IPlanshipCustomerContext } from './customerContext'

const usePlanshipCustomer = () => {
  return useContext<IPlanshipCustomerContext>(context)
}

export { usePlanshipCustomer }
