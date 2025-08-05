import {createContext, useState} from "react";

export const useAPIContext2 = () => {
    const [classes, setClasses] = useState([]);

    return {
        classes,
        setClasses,
    }
}

const APIContext2 = createContext({
    classes: null, setClasses: () => {},
})

export default APIContext2;