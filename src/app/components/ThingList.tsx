"use client";
import { useThingStore } from "../store/thingsStore";
import { useEffect } from "react";
import { subscribeThings } from "../lib/firestore";
import { addThing, toggleTrash, updateThing, moveThing } from "../lib/firestore";
import { ItemList } from "./ItemList";

export default function ThingList() {
  const things = useThingStore((state) => state.things);
  const setThings = useThingStore((state) => state.setThings);
  const view = useThingStore((state) => state.view);

  useEffect(() => {
    const unsubscribe = subscribeThings(setThings);
    return unsubscribe;
  }, [setThings]);

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
      {filtered.map((t, index) => (
        <div key={t.id} className="border-t p-2 pb-6">
          {/* タイトル編集 */}
          <input type="text"
            placeholder="thing title"
            defaultValue={t.title}
            className={t.title !== "" ? "underline" : "" + "text-[34px] "}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return
              const inputEl = e.target as HTMLInputElement
              updateThing(t.id, { title: inputEl.value })
              inputEl.blur()
            }}
          />
          {/* items */}
          <ItemList thing={t} />

          {/* ゴミ箱ボタン、↑ボタン、↓ボタン */}
          <div className="flex text-[20px] gap-2">
            <button className="round border p-1" onClick={() => toggleTrash(t.id)}>{t.trashed ? "復元" : "ゴミ箱"}
            </button>
            <button onClick={() => moveThing(t.id, true)} style={{ opacity: (index === 0) ? 0.0 : 1.0, pointerEvents: (index === 0) ? "none" : "auto" }}>↑</button>
            <button onClick={() => moveThing(t.id, false)} style={{ opacity: (index >= filtered.length - 1) ? 0.0 : 1.0, pointerEvents: (index >= filtered.length - 1) ? "none" : "auto" }}>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}
