import { Thing, Item } from "@/types"
import { deleteItem, updateItemAtIndex, addItem } from "../lib/firestore";

export function ItemList({ thing }: { thing: Thing }) {
    const items = thing.items as Item[];
    return (
        <div>
            <ul className="flex flex-wrap text-[22px] my-4 gap-x-4 text-[#277a4f]">
                {items.map((item, i) =>
                    <li key={item.id} >
                        <input type="text" defaultValue={item.text} style={{ width: "200px" }} placeholder="item" onKeyDown={(e) => {
                            if (e.key !== "Enter") return
                            const inputEl = e.target as HTMLInputElement
                            const text = inputEl.value
                            if (text === "") {
                                deleteItem(thing.id, item.id)
                            } else {
                                updateItemAtIndex(thing.id, i, inputEl.value)
                                inputEl.blur()
                            }
                        }} />
                    </li>
                )}
                <li>
                    <button onClick={() => { addItem(thing.id) }}>+</button>
                </li>
            </ul >
        </div>
    )
}