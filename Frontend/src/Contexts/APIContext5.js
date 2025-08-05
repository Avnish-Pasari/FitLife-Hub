import {createContext, useState} from "react";

export const useAPIContext5 = () => {
    const [pay, setPay] = useState([]);

    return {
        pay,
        setPay,
    }
}

const APIContext5 = createContext({
    pay: null, setPay: () => {},
})

export default APIContext5;

