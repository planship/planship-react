import React, { ReactNode, useState, useEffect } from 'react'

import { CustomerSubscriptionWithPlan, PlanshipCustomer, Entitlements } from '@planship/fetch'
import { Provider } from './customerContext'
import { CustomerProviderConfig } from './types'

export default function withPlanshipCustomerProvider(
  config: CustomerProviderConfig,
  initialEntitlements: Entitlements,
  initialSubscriptions: CustomerSubscriptionWithPlan[]
) {
  const { baseUrl, webSocketUrl, slug, getAccessToken, customerId } = config

  const planshipCustomerApiClient = new PlanshipCustomer(slug, customerId, getAccessToken, {
    baseUrl,
    webSocketUrl
  })

  const PlanshipCustomerProvider = ({ children }: { children: ReactNode }) => {
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
