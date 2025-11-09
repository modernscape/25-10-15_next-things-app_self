import { useState, useRef, useLayoutEffect } from "react"

export default function AutoWidthInput({
    value: initial,
    onConfirm,
    font,
}: {
    value: string,
    onConfirm: (val: string) => void,
    font?: string
}) {
    const [val, setVal] = useState(initial) // inputの文字
    const spanRef = useRef<HTMLSpanElement>(null) // ダミーのspan
    const [w, setW] = useState(1) // 幅

    useLayoutEffect(() => {
        if (spanRef.current) {
            setW(spanRef.current.offsetWidth + 4)
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
            />
        </div>
    )
}