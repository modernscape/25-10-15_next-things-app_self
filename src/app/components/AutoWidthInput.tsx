import { useState, useRef, useLayoutEffect } from "react"

export default function AutoWidthInput({ value: initial }: { value: string }) {


    const [val, setVal] = useState(initial) // inputの文字
    const spanRef = useRef<HTMLSpanElement>(null) // ダミーのspan
    const [w, setW] = useState(1) // 幅

    useLayoutEffect(() => {
        if (spanRef.current) {
            setW(spanRef.current.offsetWidth + 4)
        }
    }, [val])

    return <div></div>
}