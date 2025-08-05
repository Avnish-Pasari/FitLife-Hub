import {createContext, useState} from "react";

export const useAPIContextFilter = () => {
    const [classes, setClasses] = useState([]);

    return {
        classes,
        setClasses,
    }
}

const APIContextFilter = createContext({
    classes: null, setClassFilter: () => {},
})

export default APIContextFilter;