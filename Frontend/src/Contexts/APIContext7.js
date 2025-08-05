import {createContext, useState} from "react";

export const useAPIContext7 = () => {
    const [classhistory, setClassHistory] = useState([]);

    return {
        classhistory,
        setClassHistory,
    }
}

const APIContext7 = createContext({
    classhistory: null, setClassHistory: () => {},
})

export default APIContext7;