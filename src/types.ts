import { Entitlements, TokenGetter } from '@planship/fetch'

export interface ProviderConfig {
  baseUrl?: string
  slug: string
  webSocketUrl?: string
  getAccessToken: TokenGetter
}

export interface CustomerProviderConfig extends ProviderConfig {
  customerId: string
}

export class EntitlementsBase {
  protected entitlementsDict: Entitlements = {}

  constructor(entitlementsDict: Entitlements) {
    this.entitlementsDict = entitlementsDict
  }
}
