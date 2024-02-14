import React, { ReactNode } from 'react'

import { Planship } from '@planship/fetch'
import { Provider } from './context'
import { ProviderConfig } from './types'

export default function withPlanshipProvider(config: ProviderConfig) {
  const { url, websocketUrl, slug, getAccessToken } = config

  const PlanshipProvider = ({ children }: { children: ReactNode }) => {
    const planshipApiClient = new Planship(slug, url || 'https://api.planship.io', getAccessToken, websocketUrl)
    return <Provider value={{ planshipApiClient }}>{children}</Provider>
  }

  return PlanshipProvider
}