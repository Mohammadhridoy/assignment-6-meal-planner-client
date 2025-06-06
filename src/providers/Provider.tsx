import UserProvider from "@/context/UserContext";
import React from "react";
import StoreProvider from "./StoreProvider";


const Providers = ({children}:{children: React.ReactNode}) => {
    return (
        <UserProvider >
            <StoreProvider>
            {children}
            </StoreProvider>
        </UserProvider>
    );
};

export default Providers;