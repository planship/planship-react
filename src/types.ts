export interface ProviderConfig {
  url?: string
  slug: string
  websocketUrl?: string
  getAccessToken: (forceRefresh: boolean) => Promise<string>
}
