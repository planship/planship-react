import { Planship } from '@planship/fetch'

import { createContext } from 'react'

interface IPlanshipContext {
  planshipApiClient?: Planship
}
const context = createContext<IPlanshipContext>({
  planshipApiClient: undefined
})

const {
  /**
   * @ignore
   */
  Provider,
  /**
   * @ignore
   */
  Consumer
} = context

export { Provider, Consumer, IPlanshipContext }
export default context
