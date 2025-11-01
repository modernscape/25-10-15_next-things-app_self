"use client";
import { useThingStore } from "../store/thingsStore";
import { useEffect, useState } from "react";
import { subscribeThings } from "../lib/firestore";
import { addThing, addItem } from "../lib/firestore";

export default function ThingList() {
  const things = useThingStore((state) => state.things);
  const setThings = useThingStore((state) => state.setThings);
  const view = useThingStore((state) => state.view);

  useEffect(() => {
    const unsubscribe = subscribeThings(setThings);
    return unsubscribe;
  }, [setThings]);

  const [newTitle, setNewTitle] = useState(""); // Thingの追加用
  const filtered = things.filter((t) => (view === "active" ? !t.trashed : t.trashed));

  return (
    <div>
      {/* （1）Thing追加フォーム */}
      {view === "active" && (
        <div className="mb-4">
          <input type="text" placeholder="新しいThing" />
          <button onClick={() => addThing("Thing", things.length)}>+</button>
        </div>
      )}
      {/* （2）Things */}
      {filtered.map((t, i) => (
        <div key={i} className="border">
          {/* タイトル編集 */}
          <input type="text" placeholder="Thingのタイトル入力" defaultValue={t.title} />
          {/* items */}
          <ul className="flex">
            {t.items.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
            <button onClick={() => { addItem(t.id); }}>
              +
            </button>
          </ul>
          {/* ゴミ箱ボタン、↑ボタン、↓ボタン */}
          <div className="flex">
            <button>ゴミ</button>
            <button>↑</button>
            <button>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}
