import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'
import type { Costs, Economy } from '@/types'

export type CostsState = {
    electric?: Costs
    gas?: Costs
    economy?: Economy
    initialCost?: number
}

export type CostsAction =
    | { type: 'SET_COSTS'; payload: CostsState }
    | { type: 'CLEAR_COSTS' }

const initialState: CostsState = {}

const appReducer = (state: CostsState, action: CostsAction): CostsState => {
    switch (action.type) {
        case 'SET_COSTS':
            return {
                ...action.payload,
            }
        case 'CLEAR_COSTS':
            return {}
        default:
            return state
    }
}

export const CostsContext = createContext<
    | {
          costsState: CostsState
          costsDispatch: Dispatch<CostsAction>
      }
    | undefined
>(undefined)

export const CostsProvider = ({ children }: { children: ReactNode }) => {
    const [costsState, costsDispatch] = useReducer(appReducer, initialState)

    return (
        <CostsContext.Provider value={{ costsState, costsDispatch }}>
            {children}
        </CostsContext.Provider>
    )
}

// Custom hook for easy access to context
export const useCostsContext = () => {
    const context = useContext(CostsContext)
    if (context === undefined) {
        throw new Error('useCostsContext must be used within a CostsProvider')
    }

    return context
}
