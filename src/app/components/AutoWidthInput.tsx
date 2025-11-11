import { useState, useRef, useLayoutEffect } from "react"
import { forwardRef } from "react"

export const AutoWidthInput = forwardRef<HTMLInputElement, { value: string, onConfirm: (val: string) => void, font?: string, forThing: boolean }>(({
    value: initial,
    onConfirm,
    font,
    forThing
}, ref) => {
    const [val, setVal] = useState(initial)
    const spanRef = useRef<HTMLSpanElement>(null)
    const [w, setW] = useState(0)

    useLayoutEffect(() => {
        if (spanRef.current) {
            const w_ = spanRef.current.offsetWidth;
            setW(w_ > 5 ? w_ : 50)
        }
    }, [val])

    return (
        <div>
            <span
                ref={spanRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    font: font || "inherit"
                }}
            >{val || ""}</span>
            <input
                ref={ref}
                type="text"
                value={val}
                style={{ width: w, font: font || "inherit" }}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => {
                    const event = e.nativeEvent as KeyboardEvent;
                    if (e.key === "Enter" && !event.isComposing) {
                        onConfirm(val)
                        e.currentTarget.blur();
                    }
                }}
                onBlur={() => {
                    onConfirm(val)
                }}
                placeholder="title"
                // className={forThing && (val !== "") ? "underline" : "" + "text-[34px]"}
                className={`${forThing && val !== "" ? "underline" : ""} text-[34px] text-center`}
            />
        </div>
    )
});

AutoWidthInput.displayName = "AutoWidthInput"

export default AutoWidthInput;

// export const MyComponent = forwardRef<DOM要素の型, Propsの型>(
//     (props, ref) => {
//         return (
//             <タグ ref={ref} {...props} />
//         );
//     }
// );

