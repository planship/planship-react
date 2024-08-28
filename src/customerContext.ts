import type { Entitlements, PlanshipCustomerApi } from '@planship/fetch'

import { createContext } from 'react'

interface IPlanshipCustomerContext {
  planshipCustomerApiClient?: PlanshipCustomerApi
  entitlements: Entitlements
}

const context = createContext<IPlanshipCustomerContext>({
  planshipCustomerApiClient: undefined,
  entitlements: {}
})

const {
  /**
   * @ignore
   */
  Provider,
  /**
   * @ignore
   */
  Consumer
} = context

export { Provider, Consumer, IPlanshipCustomerContext }
export default context
