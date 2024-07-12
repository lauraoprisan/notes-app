import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../types';


interface AuthState {
  user: User | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

// Context type
export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
        return { ...state, user: action.payload };
        case 'LOGOUT':
        return { ...state, user: null };
        default:
        return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' }); // Ensure user is null if no stored user
        }
    }, []);
    // console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
