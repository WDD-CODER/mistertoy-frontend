import { useEffect, useRef } from "react";


export function useEffectOnUpdate(func, dependencies) {

    const isItFirstRender = useRef(true)

    useEffect(() => {
        if (isItFirstRender.current) {
            isItFirstRender.current = false
        } else {
            func()
        }
    }, [dependencies])


}