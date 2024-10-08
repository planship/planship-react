import { useContext } from 'react'

import context, { type IPlanshipCustomerContext } from './customerContext.js'
import type { Entitlements, PlanshipCustomer } from '@planship/fetch'
import { EntitlementsBase } from './types.js'

interface ICustomerContext<T extends EntitlementsBase> {
  planshipCustomerApiClient?: PlanshipCustomer
  entitlements: T
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
      entitlements: new entitlementsType(currentContext.entitlements)
    }
  } else {
    return currentContext
  }
}
