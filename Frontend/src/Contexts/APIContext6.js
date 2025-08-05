import {createContext, useState} from "react";

export const useAPIContext6 = () => {
    const [classschedule, setClassSchedule] = useState([]);

    return {
        classschedule,
        setClassSchedule,
    }
}

const APIContext6 = createContext({
    classschedule: null, setClassSchedule: () => {},
})

export default APIContext6;