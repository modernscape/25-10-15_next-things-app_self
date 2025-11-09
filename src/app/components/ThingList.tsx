"use client";
import { useThingStore } from "../store/thingsStore";
import { useEffect } from "react";
import { subscribeThings } from "../lib/firestore";
import { addThing, toggleTrash, updateThing, moveThing } from "../lib/firestore";
import { ItemList } from "./ItemList";
import AutoWidthInput from "./AutoWidthInput";

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

          <AutoWidthInput
            value={t.title}
            onConfirm={(val) => {
              updateThing(t.id, { title: val })
            }}
            font="inherit"
            forThing={true}
          />

          {/* items */}
          <ItemList thing={t} />

          {/* ゴミ箱ボタン、↑ボタン、↓ボタン */}
          <div className="flex text-[20px] gap-2">
            <button className="rounded-[5px] border-2 border-[#888888] p-1 text-[#888888]" onClick={() => toggleTrash(t.id)}>{t.trashed ? "復元" : "ゴミ箱"}
            </button>
            <button onClick={() => moveThing(t.id, true)} style={{ opacity: (index === 0) ? 0.0 : 1.0, pointerEvents: (index === 0) ? "none" : "auto" }}>↑</button>
            <button onClick={() => moveThing(t.id, false)} style={{ opacity: (index >= filtered.length - 1) ? 0.0 : 1.0, pointerEvents: (index >= filtered.length - 1) ? "none" : "auto" }}>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}
