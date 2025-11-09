import { Thing, Item } from "@/types"
import { deleteItem, updateItemAtIndex, addItem } from "../lib/firestore";
import { useEffect, useRef } from "react";
import AutoWidthInput from "./AutoWidthInput";

export function ItemList({ thing }: { thing: Thing }) {
    const items = thing.items as Item[];
    const inputRefs = useRef<HTMLInputElement[]>([])
    const prevCount = useRef(items.length)

    useEffect(() => {
        if (items.length > prevCount.current) {
            const lastIndex = items.length - 1
            inputRefs.current[lastIndex]?.focus()
        }
        prevCount.current = items.length
    }, [items.length])

    return (
        <div>
            <ul className="flex flex-wrap text-[22px] my-4 gap-x-4 text-[#277a4f]">
                {items.map((item, i) =>
                    <li key={item.id} >
                        <AutoWidthInput
                            value={item.text}
                            onConfirm={(val) => {
                                if (val === "") {
                                    deleteItem(thing.id, item.id)
                                } else {
                                    updateItemAtIndex(thing.id, i, val)
                                }
                            }}
                            font="inherit"
                            forThing={false}
                        />
                    </li>
                )}
                <li>
                    <button onClick={() => { addItem(thing.id) }}>+</button>
                </li>
            </ul >
        </div>
    )
}