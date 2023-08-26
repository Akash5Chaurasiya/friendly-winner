import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import RoleIndex from "./RoleIndex";
import Login from "../screens/Login/Login";

export interface RIAuthGuard {
    children: React.ReactNode
}
export namespace PIAuthGuard { }

interface AuthContextValue {
    authData: Auth.LoginData
    actions: {
        logout: () => void;
        login: (data: Auth.LoginData) => void;
    }
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export const useAuthContext = () => useContext(AuthContext);

export default function AuthGuard(props: RIAuthGuard) {
    const { children } = props;
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<Auth.LoginData | null>(null);
    useEffect(() => {
        (async () => {
            const loginData = await AsyncStorage.getItem('auth');
            console.log("Hii my name is Auth Context",loginData);

            if (loginData) {
                const loginDataParsed = JSON.parse(loginData) as Auth.LoginData;
                setState(loginDataParsed)
            }
            setLoading(false)
        })()
    }, [])
    if (loading) {
        // <ActivityIndicator/>
    }
    if (state)
        return (
            <AuthContext.Provider value={{
                authData: state,
                actions: {
                    logout: () => {
                        (async () => {
                            await AsyncStorage.removeItem('auth');
                            setState(null);
                        })();
                    },
                    login: d => {
                        (async () => {
                            await AsyncStorage.setItem('auth', JSON.stringify(d));
                            setState(d);
                        })();
                    }
                },
            }}>
                {children}
            </AuthContext.Provider>
        )

    return (
        <AuthContext.Provider
            value={{
                authData: {
                    loginData: {
                        success: false,
                        userId: '',
                        role: RoleIndex.UNKNOWN,
                        name: '',
                        email: '',
                        phoneNumber: '',
                    }
                },
                actions:{
                    logout:()=>{
                        setState(null)
                    },
                    login:d=>{
                        (async ()=>{
                            await AsyncStorage.setItem('auth',JSON.stringify(d))
                            setState(d);
                        })()
                    }
                }
            }}
        >
            <Login/>
        </AuthContext.Provider>
    )
}