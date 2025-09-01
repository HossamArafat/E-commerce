import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext()
export default function WindowSizeProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=> {
        function setWindowWidth() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", setWindowWidth)
        // Cleanup Function
        return () => {
            window.removeEventListener("resize", setWindowWidth)
        }
    }, [])

    return (
        <WindowSize.Provider value={{ width, setWidth }}>{children}</WindowSize.Provider>
    )
}