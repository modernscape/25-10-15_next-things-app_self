"use client";
import { useThingStore } from "../store/thingsStore";
import { useEffect, useState } from "react";
import { subscribeThings } from "../lib/firestore";
import { addThing, addItem, toggleTrash } from "../lib/firestore";

export default function ThingList() {
  const things = useThingStore((state) => state.things);
  const setThings = useThingStore((state) => state.setThings);
  const view = useThingStore((state) => state.view);

  useEffect(() => {
    const unsubscribe = subscribeThings(setThings);
    console.log(unsubscribe);

    return unsubscribe;
  }, [setThings]);

  const [newTitle, setNewTitle] = useState(""); // Thingの追加用
  const filtered = things.filter((t) => (view === "active" ? !t.trashed : t.trashed));

  return (
    <div>
      {/* （1）Thing追加フォーム */}
      {view === "active" && (
        <div className="mb-4">
          <input type="text" placeholder="new Thing" />
          <button onClick={() => addThing("Thing", things.length)}>+</button>
        </div>
      )}
      {/* （2）Things */}
      {filtered.map((t, i) => (
        <div key={i} className="border-t p-2">
          {/* タイトル編集 */}
          <input type="text" placeholder="input Thing title" defaultValue={t.title} className="underline mb-2 text-[34px]" />
          {/* items */}
          <ul className="flex flex-wrap text-[22px] text-gray-500 mb-4 gap-x-4">
            {t.items.map((item) => (
              <li key={item.id} className="">
                <input type="text" defaultValue={item.text} style={{ width: "200px" }} />
              </li>
            ))}
            <button onClick={() => { addItem(t.id); }}>
              +
            </button>
          </ul>
          {/* ゴミ箱ボタン、↑ボタン、↓ボタン */}
          <div className="flex text-[20px] gap-2">
            <button className="round border p-1" onClick={() => toggleTrash(t.id)}>{t.trashed ? "復元" : "ゴミ箱"}
            </button>
            <button>↑</button>
            <button>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}
