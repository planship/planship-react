import { CustomerSubscriptionWithPlan, Entitlements, PlanshipCustomer } from '@planship/fetch'

import { createContext } from 'react'

interface IPlanshipCustomerContext {
  planshipCustomerApiClient?: PlanshipCustomer
  entitlements: Entitlements
  subscriptions: CustomerSubscriptionWithPlan[]
}

const context = createContext<IPlanshipCustomerContext>({
  planshipCustomerApiClient: undefined,
  entitlements: {},
  subscriptions: []
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
