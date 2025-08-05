import {createContext, useState} from "react";

export const useAPIContext4 = () => {
    const [payhist, setPayHist] = useState([]);

    return {
        payhist,
        setPayHist,
    }
}

const APIContext4 = createContext({
    payhist: null, setPayHist: () => {},
})

export default APIContext4;

