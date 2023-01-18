import {
    useRef,
    useEffect
} from "react";

export function useHorizontalScroll(active) {
    const elRef = useRef();
    
    useEffect(() => {
        if (active === false) return;

        const el = elRef.current;

        if (el) {
            function onScroll(e) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }

            el.addEventListener("wheel", onScroll);
            return () => el.removeEventListener("wheel", onScroll);
        }
    }, [active]);
    return elRef;
}
