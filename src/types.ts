import { TokenGetter } from '@planship/fetch'

export interface ProviderConfig {
  baseUrl?: string
  slug: string
  webSocketUrl?: string
  getAccessToken: TokenGetter
}

export interface CustomerProviderConfig extends ProviderConfig {
  customerId: string
}
