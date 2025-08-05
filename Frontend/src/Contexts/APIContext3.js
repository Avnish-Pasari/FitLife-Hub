import {createContext, useState} from "react";

export const useAPIContext3 = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    return {
        subscriptions,
        setSubscriptions,
    }
}

const APIContext3 = createContext({
    subscriptions: null, setSubscriptions: () => {},
})

export default APIContext3;