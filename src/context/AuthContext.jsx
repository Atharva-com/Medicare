import { createContext, useEffect, useReducer } from "react"

const initialState = {
    user: localStorage.getItem('user') === undefined ? null : JSON.parse(localStorage.getItem('user')) ,
    token: localStorage.getItem('access_token') || null,
    role: localStorage.getItem('role') || null,
}

export const authContext = createContext(initialState)

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":

            return {
                user: null,
                token: null,
                role: null,
            }

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            }

        case "LOGOUT":
            return {
                user: null,
                token: null,
                role: null,
            }

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        const currentUser = localStorage.setItem('user', JSON.stringify(state.user))
        const currentUserToken = localStorage.setItem('access_token', JSON.stringify(state.token))
        const currentUserRole = localStorage.setItem('role', JSON.stringify(state.role))
        state.user = currentUser
        state.token = currentUserToken
        state.role = currentUserRole
    }, [state])

    return (
        <authContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch,
            }}
        >
            {children}
        </authContext.Provider>
    )
}