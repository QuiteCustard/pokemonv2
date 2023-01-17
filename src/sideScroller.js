import {
    useRef,
    useEffect
} from "react";

export function useHorizontalScroll() {
    const elRef = useRef();

    useEffect(() => {
        const el = elRef.current;

        if (el) {
            function onScroll(e) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }

            el.addEventListener("wheel", onScroll);
            return () => el.removeEventListener("wheel", onScroll);
        }
    }, []);
    return elRef;
}