"use client";
import { useThingStore } from "../store/thingsStore";
import { useEffect, useState } from "react";
import { subscribeThings } from "../lib/firestore";

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
      {view === "active" && <div>Thing追加フォーム</div>}
      {/* （2）Things */}
      {}
    </div>
  );
}
