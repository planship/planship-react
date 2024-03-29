# planship-react

Welcome to the [Planship](https://planship.io) client-side SDK for React. This SDK is built on top of the [@planship/fetch](https://github.com/planship/planship-js/tree/master/packages/fetch) JavaScript library, and it uses the [React Context API](https://react.dev/learn/passing-data-deeply-with-context) to make consuming Planship data and functionality in React and Next.js apps easier.

## The basics

The Planship React SDK implements two context providers:

- [`Planship`](#planship-context-provider) provider initialized with `withPlanshipProvider` and accessible via the `usePlanship` hook. This provider exposes an instance of the [Planship API client class](https://github.com/planship/planship-js/blob/master/packages/fetch/docs/classes/Planship.md).

- [`PlanshipCustomer`](#planshipcustomer-context-provider) provider initialized with `withPlanshipCustomerProvider` and accessible via the `usePlanshipCustomer` hook. This provider exposes an instance of the [Planship Customer API client class](https://github.com/planship/planship-js/blob/master/packages/fetch/docs/classes/PlanshipCustomer.md) as well as customer `entitlements` that are automatically updated via a WebSocket connection.

## Installation

Install `@planship/react` with npm, yarn or pnpm:

```sh
npm install @planship/react
# or
yarn add @planship/react
# or
pnpm add @planship/react
```

## Planship context provider

The Planship context provider is designed to be initialized at the very top of your layout where the Planship customer ID might not be known (E.g. outside of your authed layout).

With `@planship/react` installed, initialize the Planship context provider, and wrap your components with it.

```js
import { withPlanshipProvider } from '@planship/react'

function App() {
  const PlanshipProvider = withPlanshipProvider(
    {
      slug: 'clicker-demo', // your Planship product slug
      getAccessToken: getAccessToken, // function that returns a valid Planship token
    }
  )

  return (
    <PlanshipProvider>
      <Page />
    </PlanshipProvider>
  )
}
```

Then, consume the Planship context in any of the nested components:

```js
import { usePlanship } from '@planship/react'

export default function YourComponent({ children }) {
  const { planshipApiClient } = usePlanship()

  // Hook that provides the current user
  const user = useCurrentUser()

  // React state for Planship entitlements
  const [entitlements, setEntitlements ] = useState(() => ({}))

  // useEffect hook to retrieve entitlements from Planship via an API call
  useEffect(() => {
    async function fetchEntitlements(customerId: string) {
      planshipApiClient.getEntitlements(user.id)
      .then((e) => setEntitlements(e))
    }
    fetchEntitlements(user.id)
  }, [user])

  return (
    // Render some content using Planship customer entitlements
  )
}
```

## PlanshipCustomer context provider

The PlanshipCustomer context provider is designed to be initialized within a context where the Planship customer ID (typically your current user) is known, and it makes consuming customer level data like entitlements much easier.

With `planship-react` installed, initialize the PlanshipCustomer context provider, and wrap your components with it.

```js
import { withPlanshipCustomerProvider } from '@planship/react'

function App() {
  const user = getCurrentUser() //
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      slug: 'clicker-demo',           // Planship product slug
      customerId: user.id,            // Planship customer ID
      getAccessToken: getAccessToken, // function that returns a valid Planship token
    }
  )

  return (
    <PlanshipCustomerProvider>
      <Page />
    </PlanshipCustomerProvider>
  )
}
```

Then, consume the PlanshipCustomer context in any of the nested components:

```js
import { usePlanshipCustomer } from '@planship/react'

export default function YourComponent({ children }) {
  const { entitlements } = usePlanshipCustomer()

  return (
    // Render some content using Planship customer entitlements
  )
}
```

Just like the Planship provider, PlanshipCustomer exposes the full Planship API. However, no customer ID is required for customer operations.

```js
import { usePlanshipCustomer } from '@planship/react'

export default function SubscriptionInfoComponent({ children }) {
  const { planshipCustomerApiClient } = usePlanshipCustomer()

  // React state for Planship subscriptions
  const [subscriptions, setSubscriptions ] = useState(() => ([]))

  // useEffect hook to retrieve subscriptions via the Planship API
  useEffect(() => {
    async function fetchSubscriptions() {
      // No customer ID is required in PlanshipCustomer API client calls
      planshipCustomerApiClient.listSubscriptions((s) => setSubscriptions(s))
    }

    fetchSubscriptions()
  }, [user])

  return (
    // Render a list of Planship customer subscriptions
  )
}
```

## Using Planship providers in a Next.js app

By default, all components in a Next.js app are React Server Components. React Server Components don't allow for consuming React context *directly*, so Planship context providers cannot by used *as is*. To address this, simply wrap them your own Client Component as outlined in [this official guide](https://vercel.com/guides/react-context-state-management-nextjs#rendering-third-party-context-providers-in-server-components).

```js
'use client'

import { withPlanshipCustomerProvider } from '@planship/react'

export default function PlanshipProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const PlanshipCustomerProvider = withPlanshipCustomerProvider(
    {
      slug: 'clicker-demo',           // Planship product slug
      getAccessToken: getAccessToken, // function that returns a Planship access token
    },
  )

  // current user context provided by CurrentUserProvider
  const currentUser = useCurrentUser()

  return (
    <PlanshipCustomerProvider customerId={currentUser.id}>
      {children}
    </PlanshipCustomerProvider>
  )
}
```

Then, you can use the new `PlanshipCustomerProvider` component in your Next.js app, E.g. in your root layout.

```js
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <CurrentUserProvider>
          <PlanshipProvider>
            {children}
          </PlanshipProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
```

A complete working example of a Nuxt.js app integrated with Planship can be found at https://github.com/planship/planship-nextjs-demo

## Links

- [Planship Next.js demo app](https://github.com/planship/planship-nextjs-demo)
- [@planship/fetch library at the NPM Registry](https://www.npmjs.com/package/@planship/fetch)
- [Planship documentation](https://docs.planship.io)
- [Planship console](https://app.planship.io)
