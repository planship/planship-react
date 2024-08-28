import { useContext } from 'react'

import context, { IPlanshipCustomerContext } from './customerContext'
import { CustomerSubscriptionWithPlan, Entitlements, PlanshipCustomer } from '@planship/fetch'
import { EntitlementsBase } from './types'

interface ICustomerContext<T extends EntitlementsBase> {
  planshipCustomerApiClient?: PlanshipCustomer
  entitlements: T
  subscriptions: CustomerSubscriptionWithPlan[]
}

export function usePlanshipCustomer(): IPlanshipCustomerContext
export function usePlanshipCustomer<TEntititlements extends EntitlementsBase>(entitlementsType: {
  new (entitlementsDict: Entitlements): TEntititlements
}): ICustomerContext<TEntititlements>
export function usePlanshipCustomer(entitlementsType?: { new (entitlementsDict: Entitlements): object }) {
  const currentContext = useContext<IPlanshipCustomerContext>(context)
  if (entitlementsType) {
    return {
      planshipCustomerApiClient: currentContext.planshipCustomerApiClient,
      subscriptions: currentContext.subscriptions,
      entitlements: new entitlementsType(currentContext.entitlements)
    }
  } else {
    return currentContext
  }
}
