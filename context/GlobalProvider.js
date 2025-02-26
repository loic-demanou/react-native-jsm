import { Children, createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ Children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res);
                // return console.log(user)
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [])
    

    return (
        <GlobalContext.Provider
        value={{ 
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            // setIsLoading,
        }}
        >
            {/* {console.log(user)} */}
            { Children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;