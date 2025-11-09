import { useState, useRef, useLayoutEffect } from "react"

export default function AutoWidthInput({
    value: initial,
    onConfirm,
    font,
    forThing,
}: {
    value: string,
    onConfirm: (val: string) => void,
        font?: string,
        forThing: boolean
}) {
    const [val, setVal] = useState(initial) // inputの文字
    const spanRef = useRef<HTMLSpanElement>(null) // ダミーのspan
    const [w, setW] = useState(1) // 幅

    useLayoutEffect(() => {
        if (spanRef.current) {
            setW(Math.max(spanRef.current.offsetWidth, 40) + 4)
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
                    font: font || "inheret"
                }}
            >{val || " "}</span>
            <input
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
                onBlur={(e) => {
                    onConfirm(val)
                    e.currentTarget.blur();
                }}
                placeholder="title"
                className={forThing && (val !== "") ? "underline" : "" + "text-[34px]"}
            />
        </div>
    )
}