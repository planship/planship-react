import React, { ReactNode } from 'react'

import { Planship } from '@planship/fetch'
import { Provider } from './context.js'
import type { ProviderConfig } from './types.js'

export default function withPlanshipProvider(config: ProviderConfig) {
  const { baseUrl, webSocketUrl, slug, getAccessToken } = config
  const planshipApiClient = new Planship(slug, getAccessToken, {
    baseUrl,
    webSocketUrl
  })

  const PlanshipProvider = ({ children }: { children: ReactNode }) => {
    return <Provider value={{ planshipApiClient }}>{children}</Provider>
  }

  return PlanshipProvider
}
