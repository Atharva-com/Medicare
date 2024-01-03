import { createContext, useEffect, useReducer } from "react"

const initialState = {
    user: localStorage.getItem('user') === undefined ? null : JSON.parse(localStorage.getItem('user')) ,
    token: localStorage.getItem('access_token') || null,
    role:  (localStorage.getItem('role')).replace(/"/g, '') || null,
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
            console.log(state)
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('access_token', state.token)
        localStorage.setItem('role', state.role)
        // state.user = currentUser
        // state.token = currentUserToken
        // state.role = currentUserRole
        console.log(state)
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