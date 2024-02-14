export interface ProviderConfig {
  url?: string
  slug: string
  websocketUrl?: string
  getAccessToken: (forceRefresh: boolean) => Promise<string>
}

export interface CustomerProviderConfig extends ProviderConfig {
  customerId: string
}
