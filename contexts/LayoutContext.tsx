import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'

export type LayoutState = {
    formContainerPositionX?: number
    formContainerPositionY?: number
}

export type LayoutAction = {
    type: 'SET_FORM_CONTAINER_POSITION'
    payload: { x: number; y: number }
}

const initialState: LayoutState = {}

const appReducer = (state: LayoutState, action: LayoutAction): LayoutState => {
    switch (action.type) {
        case 'SET_FORM_CONTAINER_POSITION':
            return {
                ...state,
                formContainerPositionX: action.payload.x,
                formContainerPositionY: action.payload.y,
            }
        default:
            return state
    }
}

export const LayoutContext = createContext<
    | {
          layoutState: LayoutState
          layoutDispatch: Dispatch<LayoutAction>
      }
    | undefined
>(undefined)

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [layoutState, layoutDispatch] = useReducer(appReducer, initialState)

    return (
        <LayoutContext.Provider value={{ layoutState, layoutDispatch }}>
            {children}
        </LayoutContext.Provider>
    )
}

// Custom hook for easy access to context
export const useLayoutContext = () => {
    const context = useContext(LayoutContext)
    if (context === undefined) {
        throw new Error('useLayoutContext must be used within a LayoutProvider')
    }

    return context
}
