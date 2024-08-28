import React, { ReactNode, useState, useEffect } from 'react'

import { PlanshipCustomer, type Entitlements } from '@planship/fetch'
import { Provider } from './customerContext'
import type { CustomerProviderConfig } from './types'

export default function withPlanshipCustomerProvider(
  config: CustomerProviderConfig,
  initialEntitlements: Entitlements
) {
  const { baseUrl, webSocketUrl, slug, getAccessToken, customerId } = config

  const planshipCustomerApiClient = new PlanshipCustomer(slug, customerId, getAccessToken, {
    baseUrl,
    webSocketUrl
  })

  const PlanshipCustomerProvider = ({ children }: { children: ReactNode }) => {
    const [entitlements, setEntitlements] = useState(initialEntitlements)

    useEffect(() => {
      let isFetching = false

      async function fetchAll() {
        if (!isFetching) {
          planshipCustomerApiClient.getEntitlements((e) => setEntitlements(e)).then((e) => setEntitlements(e))
        }
      }

      fetchAll()
      return () => {
        isFetching = true
      }
    }, [])

    return <Provider value={{ planshipCustomerApiClient, entitlements }}>{children}</Provider>
  }

  return PlanshipCustomerProvider
}
