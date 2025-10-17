"use client";
import { Menu, Trash } from "lucide-react";
import { useThingStore } from "../store/thingsStore";

export default function Sidebar() {
  const style_btn = "flex items-center m-2 gap-2";
  const setView = useThingStore((state) => state.setView);

  return (
    <div className="flex pr-4 text-2xl">
      <div className="flex flex-col">
        <button onClick={() => setView("active")} className={style_btn}>
          <Menu />
          One Thing
        </button>
        <button onClick={() => setView("trashed")} className={style_btn}>
          <Trash />
          ゴミ箱
        </button>
      </div>
    </div>
  );
}
