import React, { ReactNode, useState, useEffect } from 'react'

import { CustomerSubscriptionWithPlan, PlanshipCustomer, JSONValue } from '@planship/fetch'
import { Provider } from './customerContext'
import { ProviderConfig } from './types'

export default function withPlanshipCustomerProvider(
  config: ProviderConfig,
  initialEntitlements: JSONValue,
  initialSubscriptions: CustomerSubscriptionWithPlan[]
) {
  const { url, websocketUrl, slug, getAccessToken } = config

  let planshipCustomerApiClient: PlanshipCustomer

  const PlanshipCustomerProvider = ({ children, customerId }: { children: ReactNode; customerId: string }) => {
    planshipCustomerApiClient = new PlanshipCustomer(
      slug,
      customerId,
      url || 'https://api.planship.io',
      getAccessToken,
      websocketUrl
    )

    const [entitlements, setEntitlements] = useState(initialEntitlements)
    const [subscriptions, setSubscriptions] = useState(initialSubscriptions)

    useEffect(() => {
      let isFetching = false

      async function fetchAll() {
        if (!isFetching) {
          planshipCustomerApiClient.getEntitlements((e) => setEntitlements(e)).then((e) => setEntitlements(e))
          planshipCustomerApiClient.listSubscriptions().then((s) => setSubscriptions(s))
        }
      }

      fetchAll()
      return () => {
        isFetching = true
      }
    }, [])

    return <Provider value={{ planshipCustomerApiClient, entitlements, subscriptions }}>{children}</Provider>
  }

  return PlanshipCustomerProvider
}
